import React, { useState, useEffect, useCallback } from 'react';
import { GameState, PlayerProgress, GameStep, Achievement } from '../shared/types/game';
import { GameBoard } from './components/GameBoard';
import { StatsPanel } from './components/StatsPanel';
import { ChoicePanel } from './components/ChoicePanel';
import { ViralPanel } from './components/ViralPanel';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { AchievementPanel } from './components/AchievementPanel';
import { LeaderboardPanel } from './components/LeaderboardPanel';
import { SocialSharePanel } from './components/SocialSharePanel';
import { AudioManager } from './components/AudioManager';
import packageJson from '../../package.json';

function extractSubredditName(): string | null {
  const devCommand = packageJson.scripts?.['dev:devvit'];
  if (!devCommand || !devCommand.includes('devvit playtest')) {
    return null;
  }
  const argsMatch = devCommand.match(/devvit\s+playtest\s+(.*)/);
  if (!argsMatch || !argsMatch[1]) {
    return null;
  }
  const args = argsMatch[1].trim().split(/\s+/);
  const subreddit = args.find((arg) => !arg.startsWith('-'));
  return subreddit || null;
}

const Banner = () => {
  const subreddit = extractSubredditName();
  if (!subreddit) {
    return (
      <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-4 text-center mb-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-lg mb-2">The Notice Period - Corporate Survival Simulator</h2>
          <p>Please visit your playtest subreddit to play with full Reddit integration!</p>
        </div>
      </div>
    );
  }

  const subredditUrl = `https://www.reddit.com/r/${subreddit}`;
  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-4 text-center mb-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-bold text-lg mb-2">The Notice Period - Corporate Survival Simulator</h2>
        <p>
          Visit{' '}
          <a
            href={subredditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold hover:text-red-200 transition-colors"
          >
            r/{subreddit}
          </a>{' '}
          for full Reddit integration! Create a post from the three dots menu.
        </p>
      </div>
    </div>
  );
};

const getPhaseBackground = (phase: string) => {
  switch (phase) {
    case 'hunt':
      return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400';
    case 'honeymoon':
      return 'bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100';
    case 'grind':
      return 'bg-gradient-to-br from-red-950 via-black to-gray-950';
    case 'choice':
      return 'bg-gradient-to-br from-red-950 via-black to-gray-950';
    default:
      return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
  }
};

const getPhaseTextColor = (phase: string) => {
  switch (phase) {
    case 'hunt':
      return 'text-blue-900';
    case 'honeymoon':
      return 'text-yellow-800';
    case 'grind':
      return 'text-red-100';
    case 'choice':
      return 'text-red-100';
    default:
      return 'text-white';
  }
};

const getPhaseAccentColor = (phase: string) => {
  switch (phase) {
    case 'hunt':
      return 'text-blue-800';
    case 'honeymoon':
      return 'text-yellow-700';
    case 'grind':
      return 'text-red-400';
    case 'choice':
      return 'text-red-400';
    default:
      return 'text-white';
  }
};

const getPhasePrompt = (phase: string, step: number) => {
  switch (phase) {
    case 'hunt':
      if (step === 1) {
        return "🎯 THE HUNT BEGINS: Welcome to the job market! You're optimistic, hopeful, and ready to conquer the corporate world. Your resume is polished, your LinkedIn is updated, and you believe this time will be different. The hunt for the perfect job starts now!";
      }
      return null;
    case 'honeymoon':
      if (step === 9) {
        return "🍯 HONEYMOON PHASE: Congratulations! You got the job! Everything seems perfect - the office is modern, your colleagues are friendly, and management talks about 'work-life balance.' This is it, you think. This company is different. The honeymoon period begins...";
      }
      return null;
    case 'grind':
      if (step === 16) {
        return "⚙️ THE GRIND BEGINS: Reality hits like a freight train. The honeymoon is over. The true nature of corporate life reveals itself - endless meetings, impossible deadlines, and soul-crushing bureaucracy. Welcome to the machine. Your stress levels are about to skyrocket.";
      }
      return null;
    case 'choice':
      if (step === 26) {
        return "🚪 THE FINAL CHOICE: You've reached the crossroads. After experiencing the full corporate cycle, you must decide your fate. Will you escape this purgatory and forge your own path? Will you get trapped in another corporate prison? Or will you take time to figure it out? The choice is yours.";
      }
      return null;
    default:
      return null;
  }
};

export const NoticePeriodGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [viralContent, setViralContent] = useState<any>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activePanel, setActivePanel] = useState<'game' | 'achievements' | 'leaderboard' | 'share'>('game');
  const [initializationStep, setInitializationStep] = useState<string>('Starting...');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showPhasePrompt, setShowPhasePrompt] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    setShowBanner(!hostname.endsWith('devvit.net'));
  }, []);

  // Check for phase transitions and show prompts
  useEffect(() => {
    if (gameState) {
      const prompt = getPhasePrompt(gameState.player.phase, gameState.currentStep.id);
      if (prompt) {
        setShowPhasePrompt(prompt);
        // Auto-hide after 8 seconds
        setTimeout(() => setShowPhasePrompt(null), 8000);
      }
    }
  }, [gameState?.player.phase, gameState?.currentStep.id]);

  const initializeGame = useCallback(async () => {
    try {
      setLoading(true);
      setInitializationStep('Connecting to server...');
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      );

      const initPromise = fetch('/api/init');
      const response = await Promise.race([initPromise, timeoutPromise]) as Response;
      const result = await response.json();
      
      if (result.status === 'error') {
        setError(result.message || 'Failed to initialize game');
        return;
      }

      setInitializationStep('Loading game state...');
      
      // Get initial game state with timeout
      const statePromise = fetch('/api/game/state');
      const stateResponse = await Promise.race([statePromise, timeoutPromise]) as Response;
      const stateResult = await stateResponse.json();
      
      if (stateResult.status === 'success') {
        setGameState(stateResult.gameState);
        setGameStarted(true);
        
        setInitializationStep('Loading achievements...');
        
        // Load achievements (non-blocking)
        try {
          const achievementsResponse = await fetch('/api/achievements');
          const achievementsResult = await achievementsResponse.json();
          if (achievementsResult.status === 'success') {
            setAchievements(achievementsResult.achievements);
          }
        } catch (err) {
          console.warn('Failed to load achievements:', err);
          // Continue without achievements
        }
      } else {
        setError(stateResult.message || 'Failed to get game state');
      }
    } catch (err) {
      console.error('Error initializing game:', err);
      if (err instanceof Error && err.message === 'Connection timeout') {
        setError('Connection timeout. The server might be slow to respond. Please try again.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const makeChoice = useCallback(async (choice: string, choiceIndex: number) => {
    if (!gameState) return;

    try {
      setLoading(true);
      
      // Add timeout for choice processing
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Choice processing timeout')), 8000)
      );

      const choicePromise = fetch('/api/game/choice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice, choiceIndex }),
      });

      const response = await Promise.race([choicePromise, timeoutPromise]) as Response;
      const result = await response.json();
      
      if (result.status === 'success') {
        const newGameState: GameState = {
          player: result.player,
          currentStep: result.nextStep || gameState.currentStep,
          gameComplete: result.gameComplete,
          leaderboard: gameState.leaderboard
        };
        
        setGameState(newGameState);
        setViralContent({
          post: result.viralPost,
          achievement: result.achievement,
          stressChange: result.stressChange,
          moneyChange: result.moneyChange
        });

        // Update achievements if new ones were unlocked
        if (result.newAchievements && result.newAchievements.length > 0) {
          setAchievements(prev => [...prev, ...result.newAchievements]);
        }
      } else {
        setError(result.message || 'Failed to process choice');
      }
    } catch (err) {
      console.error('Error making choice:', err);
      if (err instanceof Error && err.message === 'Choice processing timeout') {
        setError('Choice processing timeout. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [gameState]);

  const startNewGame = useCallback(async () => {
    try {
      setLoading(true);
      setInitializationStep('Resetting game...');
      
      // Call reset endpoint
      const response = await fetch('/api/game/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // Reset local state
        setGameState(null);
        setGameStarted(false);
        setError(null);
        setViralContent(null);
        setAchievements([]);
        setActivePanel('game');
        setShowPhasePrompt(null);
        
        // Reinitialize the game
        await initializeGame();
      } else {
        setError(result.message || 'Failed to reset game');
      }
    } catch (err) {
      console.error('Error resetting game:', err);
      setError('Failed to reset game. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [initializeGame]);

  const shareAchievement = useCallback(async (achievement: Achievement) => {
    try {
      await navigator.clipboard.writeText(achievement.shareText);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy achievement text:', err);
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => !prev);
  }, []);

  if (loading && !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl mb-2">Loading The Notice Period...</p>
          <p className="text-gray-400 text-sm mb-4">{initializationStep}</p>
          
          {/* Loading tips */}
          <div className="bg-gray-800/50 rounded-lg p-4 text-left">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Loading Tips:</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• First load may take longer as the server starts up</li>
              <li>• Reddit integration requires subreddit setup</li>
              <li>• Check your network connection if loading persists</li>
            </ul>
          </div>
          
          {/* Retry button after 10 seconds */}
          <button
            onClick={() => {
              setError(null);
              initializeGame();
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h2 className="text-white text-2xl font-bold mb-4">Connection Issue</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setError(null);
                initializeGame();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            
            <div className="bg-gray-800/50 rounded-lg p-4 text-left">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Troubleshooting:</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Check if the development server is running</li>
                <li>• Verify Reddit authentication (npm run login)</li>
                <li>• Ensure subreddit is configured in package.json</li>
                <li>• Try refreshing the page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted || !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {showBanner && <Banner />}
        <WelcomeScreen onStartGame={initializeGame} />
      </div>
    );
  }

  if (gameState.gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {showBanner && <Banner />}
        <GameOverScreen 
          player={gameState.player} 
          onPlayAgain={startNewGame}
        />
      </div>
    );
  }

  const currentPhase = gameState.player.phase;

  return (
    <div className={`min-h-screen ${getPhaseBackground(currentPhase)}`}>
      {showBanner && <Banner />}
      
      {/* Audio Manager */}
      <AudioManager 
        phase={gameState.player.phase}
        stressLevel={gameState.player.stressLevel}
        isPlaying={audioEnabled}
      />
      
      {/* Phase Prompt Overlay */}
      {showPhasePrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <div className="text-center">
              <p className="text-lg text-white leading-relaxed mb-6">{showPhasePrompt}</p>
              <button
                onClick={() => setShowPhasePrompt(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-2 tracking-tight ${getPhaseAccentColor(currentPhase)}`}>
            The Notice Period
          </h1>
          <p className={`text-xl mb-4 ${getPhaseTextColor(currentPhase)}`}>
            Corporate Survival Simulator
          </p>
          <div className={`flex justify-center items-center space-x-4 text-sm ${getPhaseTextColor(currentPhase)}`}>
            <span>Day {Math.min(gameState.player.completedSteps.length + 1, 30)} of 30</span>
            <span>•</span>
            <span>Phase: {gameState.player.phase.toUpperCase()}</span>
            <span>•</span>
            <button
              onClick={toggleAudio}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                audioEnabled 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Audio: {audioEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className={`${currentPhase === 'honeymoon' ? 'bg-yellow-200/50' : currentPhase === 'hunt' ? 'bg-blue-300/50' : 'bg-gray-800/50'} rounded-lg p-1 flex space-x-1`}>
            <button
              onClick={() => setActivePanel('game')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activePanel === 'game' 
                  ? 'bg-red-600 text-white' 
                  : `${getPhaseTextColor(currentPhase)} hover:text-white hover:bg-gray-700`
              }`}
            >
              Game
            </button>
            <button
              onClick={() => setActivePanel('achievements')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activePanel === 'achievements' 
                  ? 'bg-red-600 text-white' 
                  : `${getPhaseTextColor(currentPhase)} hover:text-white hover:bg-gray-700`
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActivePanel('leaderboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activePanel === 'leaderboard' 
                  ? 'bg-red-600 text-white' 
                  : `${getPhaseTextColor(currentPhase)} hover:text-white hover:bg-gray-700`
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActivePanel('share')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activePanel === 'share' 
                  ? 'bg-red-600 text-white' 
                  : `${getPhaseTextColor(currentPhase)} hover:text-white hover:bg-gray-700`
              }`}
            >
              Share
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {activePanel === 'game' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats */}
            <div className="lg:col-span-1">
              <StatsPanel player={gameState.player} />
            </div>

            {/* Center Column - Game Board */}
            <div className="lg:col-span-1">
              <GameBoard 
                currentStep={gameState.currentStep}
                player={gameState.player}
                loading={loading}
              />
            </div>

            {/* Right Column - Choices */}
            <div className="lg:col-span-1">
              <ChoicePanel 
                currentStep={gameState.currentStep}
                onChoice={makeChoice}
                disabled={loading}
              />
            </div>
          </div>
        )}

        {activePanel === 'achievements' && (
          <div className="max-w-4xl mx-auto">
            <AchievementPanel 
              achievements={achievements}
              onShare={shareAchievement}
            />
          </div>
        )}

        {activePanel === 'leaderboard' && gameState.leaderboard && (
          <div className="max-w-4xl mx-auto">
            <LeaderboardPanel 
              leaderboard={gameState.leaderboard}
              playerViralScore={0}
            />
          </div>
        )}

        {activePanel === 'share' && (
          <div className="max-w-4xl mx-auto">
            <SocialSharePanel 
              gameState={gameState}
              viralScore={0}
            />
          </div>
        )}

        {/* Viral Content Panel */}
        {viralContent && activePanel === 'game' && (
          <div className="mt-8">
            <ViralPanel content={viralContent} />
          </div>
        )}

        {/* Built with Bolt.new Badge */}
        <div className="text-center mt-8">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Built with Bolt.new
          </a>
        </div>
      </div>
    </div>
  );
};