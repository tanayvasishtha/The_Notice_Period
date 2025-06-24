import express from 'express';
import { createServer, getContext, getServerPort } from '@devvit/server';
import { CheckResponse, InitResponse, GameState, PlayerProgress, GamePhase } from '../shared/types/game';
import { postConfigGet, postConfigNew, postConfigMaybeGet } from './core/post';
import { gameSteps, getStepById } from './core/gameSteps';
import { generateViralRedditPost, generateShareableAchievement, generateLeaderboardData } from './core/viralContent';
import { generateWorkplaceScenario, generateRedditPost } from './core/aiContent';
import { checkAchievements } from './core/achievements';
import { getRedis } from '@devvit/redis';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Add request timeout middleware
app.use((req, res, next) => {
  res.setTimeout(5000, () => {
    res.status(408).json({ status: 'error', message: 'Request timeout' });
  });
  next();
});

const router = express.Router();

// Initialize game
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = getContext();
    const redis = getRedis();

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      let config = await postConfigMaybeGet({ redis, postId });
      if (!config) {
        console.log(`No config found for post ${postId}, creating new one.`);
        await postConfigNew({ redis, postId });
        config = await postConfigGet({ redis, postId });
      }

      res.json({
        status: 'success',
        postId: postId,
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      const message = error instanceof Error ? error.message : 'Unknown error during initialization';
      res.status(500).json({ status: 'error', message });
    }
  }
);

// Get game state
router.get<{ postId: string }, any>(
  '/api/game/state',
  async (_req, res): Promise<void> => {
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({ status: 'error', message: 'postId and userId required' });
      return;
    }

    try {
      const playerKey = `player:${postId}:${userId}`;
      const playerData = await redis.get(playerKey);
      
      let player: PlayerProgress;
      if (!playerData) {
        // Initialize new player
        player = {
          currentStep: 1,
          stressLevel: 10,
          bankAccount: 100,
          choicesMade: [],
          startDate: new Date().toISOString(),
          completedSteps: [],
          phase: 'hunt' as GamePhase,
          escaped: null,
          achievements: [],
          viralMoments: []
        };
        await redis.set(playerKey, JSON.stringify(player));
      } else {
        player = JSON.parse(playerData);
        // Ensure new fields exist
        if (!player.achievements) player.achievements = [];
        if (!player.viralMoments) player.viralMoments = [];
      }

      const currentStep = getStepById(player.currentStep);
      if (!currentStep) {
        res.status(404).json({ status: 'error', message: 'Step not found' });
        return;
      }

      const leaderboard = generateLeaderboardData();

      const gameState: GameState = {
        player,
        currentStep,
        gameComplete: player.currentStep > 30 || player.escaped !== null,
        leaderboard
      };

      res.json({ status: 'success', gameState });
    } catch (error) {
      console.error('Error getting game state:', error);
      res.status(500).json({ status: 'error', message: 'Failed to get game state' });
    }
  }
);

// Calculate bank account change based on game phase
const calculateBankAccountChange = (player: PlayerProgress, choiceIndex: number): number => {
  // Before getting job (hunt phase, before step 8)
  if (player.phase === 'hunt' && player.currentStep < 8) {
    return -5; // Lose $5 per day while job hunting
  }
  
  // After getting job but before honeymoon ends (steps 8-15)
  if (player.currentStep >= 8 && player.currentStep <= 15) {
    return 0.69; // Gain $0.69 per day during honeymoon
  }
  
  // After honeymoon phase (grind and choice phases)
  if (player.currentStep > 15) {
    return 0.6969; // Gain $0.6969 per day during grind/choice
  }
  
  return 0;
};

// Make choice and advance game
router.post<{ postId: string }, any, { choice: string; choiceIndex: number }>(
  '/api/game/choice',
  async (req, res): Promise<void> => {
    const { choice, choiceIndex } = req.body;
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({ status: 'error', message: 'postId and userId required' });
      return;
    }

    if (!choice) {
      res.status(400).json({ status: 'error', message: 'Choice is required' });
      return;
    }

    try {
      const playerKey = `player:${postId}:${userId}`;
      const playerData = await redis.get(playerKey);
      
      if (!playerData) {
        res.status(404).json({ status: 'error', message: 'Player not found' });
        return;
      }

      const player: PlayerProgress = JSON.parse(playerData);
      const currentStep = getStepById(player.currentStep);
      
      if (!currentStep) {
        res.status(404).json({ status: 'error', message: 'Step not found' });
        return;
      }

      // Process choice
      player.choicesMade.push(choice);
      player.completedSteps.push(player.currentStep);

      // Calculate stress and money changes based on choice
      let stressChange = 0;
      let moneyChange = calculateBankAccountChange(player, choiceIndex);

      // Choice-specific consequences
      if (choiceIndex === 0) {
        stressChange = Math.floor(Math.random() * 10) + 5; // More stress for first option
      } else if (choiceIndex === 1) {
        stressChange = Math.floor(Math.random() * 5); // Moderate stress
      } else {
        stressChange = Math.floor(Math.random() * 15) + 10; // High stress for risky choices
      }

      // Special handling for final choice (step 30)
      if (player.currentStep === 30) {
        if (choiceIndex === 0) {
          // Entrepreneurship - add $1M and escape
          player.escaped = true;
          player.bankAccount += 1000000;
          stressChange = -50; // Stress relief from escaping
          moneyChange = 0; // Already added the million
        } else if (choiceIndex === 1) {
          // Repeat cycle - reset to day 1 with same bank account as day 1
          player.escaped = false;
          player.currentStep = 1;
          player.phase = 'hunt';
          player.bankAccount = 100; // Reset to starting amount
          player.stressLevel = 10; // Reset stress
          player.completedSteps = []; // Reset completed steps
          stressChange = 0; // Already reset
          moneyChange = 0; // Already reset
        } else {
          // Sabbatical - keep current money
          player.escaped = null;
          stressChange = -30; // Sabbatical stress relief
          moneyChange = 0; // No change for sabbatical
        }
      } else {
        // Normal progression - advance to next step
        player.currentStep += 1;
        
        // Update phase based on step (but don't go past 30)
        if (player.currentStep <= 8) player.phase = 'hunt';
        else if (player.currentStep <= 15) player.phase = 'honeymoon';
        else if (player.currentStep <= 25) player.phase = 'grind';
        else if (player.currentStep <= 30) player.phase = 'choice';
        
        // Apply money change for normal progression
        player.bankAccount = Math.max(0, player.bankAccount + moneyChange);
        
        // Update player stats for normal progression
        player.stressLevel = Math.max(0, Math.min(100, player.stressLevel + stressChange));
      }

      // Check for new achievements
      const newAchievements = checkAchievements(player);
      newAchievements.forEach(achievement => {
        if (!player.achievements.includes(achievement.id)) {
          player.achievements.push(achievement.id);
        }
      });

      // Save updated player
      await redis.set(playerKey, JSON.stringify(player));

      // Generate viral content
      const viralPost = generateViralRedditPost(
        player.completedSteps.length,
        player.stressLevel,
        currentStep.scenario,
        choice
      );

      // Generate achievement
      const achievement = generateShareableAchievement(
        player.completedSteps.length,
        choice,
        player.stressLevel
      );

      // Get next step (if not game over)
      const nextStep = (player.currentStep <= 30 && player.escaped === null) ? getStepById(player.currentStep) : null;

      res.json({
        status: 'success',
        player,
        nextStep,
        viralPost,
        achievement,
        stressChange,
        moneyChange,
        newAchievements,
        gameComplete: player.currentStep > 30 || player.escaped !== null
      });

    } catch (error) {
      console.error('Error processing choice:', error);
      res.status(500).json({ status: 'error', message: 'Failed to process choice' });
    }
  }
);

// Reset game (for "Play Again" functionality)
router.post<{ postId: string }, any>(
  '/api/game/reset',
  async (_req, res): Promise<void> => {
    const { postId, userId } = getContext();
    const redis = getRedis();

    if (!postId || !userId) {
      res.status(400).json({ status: 'error', message: 'postId and userId required' });
      return;
    }

    try {
      const playerKey = `player:${postId}:${userId}`;
      
      // Create fresh player state
      const newPlayer: PlayerProgress = {
        currentStep: 1,
        stressLevel: 10,
        bankAccount: 100,
        choicesMade: [],
        startDate: new Date().toISOString(),
        completedSteps: [],
        phase: 'hunt' as GamePhase,
        escaped: null,
        achievements: [],
        viralMoments: []
      };

      await redis.set(playerKey, JSON.stringify(newPlayer));

      res.json({ status: 'success', message: 'Game reset successfully' });
    } catch (error) {
      console.error('Error resetting game:', error);
      res.status(500).json({ status: 'error', message: 'Failed to reset game' });
    }
  }
);

// Get leaderboard data
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    const leaderboard = generateLeaderboardData();
    res.json({ status: 'success', leaderboard });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get leaderboard' });
  }
});

// Get achievements
router.get('/api/achievements', async (_req, res): Promise<void> => {
  const { postId, userId } = getContext();
  const redis = getRedis();

  if (!postId || !userId) {
    res.status(400).json({ status: 'error', message: 'postId and userId required' });
    return;
  }

  try {
    const playerKey = `player:${postId}:${userId}`;
    const playerData = await redis.get(playerKey);
    
    if (!playerData) {
      res.status(404).json({ status: 'error', message: 'Player not found' });
      return;
    }

    const player: PlayerProgress = JSON.parse(playerData);
    const allAchievements = checkAchievements(player);
    
    res.json({ status: 'success', achievements: allAchievements });
  } catch (error) {
    console.error('Error getting achievements:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get achievements' });
  }
});

// Generate AI content
router.post<any, any, { prompt: string; step: number }>(
  '/api/ai/generate',
  async (req, res): Promise<void> => {
    const { prompt, step } = req.body;

    try {
      const scenario = generateWorkplaceScenario(step, []);
      const redditPost = generateRedditPost(step, 50, scenario);

      res.json({
        status: 'success',
        content: {
          scenario,
          redditPost,
          prompt: `AI Generated: ${prompt}`
        }
      });
    } catch (error) {
      console.error('Error generating AI content:', error);
      res.status(500).json({ status: 'error', message: 'Failed to generate content' });
    }
  }
);

// Use router middleware
app.use(router);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`The Notice Period server running on http://localhost:${port}`));