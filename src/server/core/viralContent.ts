import { RedditPostData, ViralMoment, LeaderboardData } from '../../shared/types/game';

export const generateViralRedditPost = (day: number, stressLevel: number, scenario: string, choice: string): RedditPostData => {
  const subreddits = ['antiwork', 'cscareerquestions', 'ProgrammerHumor', 'jobs', 'careerguidance', 'WorkReform'];
  const selectedSubreddit = subreddits[day % subreddits.length] || 'antiwork';
  
  const titles = [
    `Day ${day} of Corporate Survival - ${getStressDescription(stressLevel)}`,
    `Corporate Life Update Day ${day}: ${getStressDescription(stressLevel)}`,
    `The Notice Period Day ${day}: ${getStressDescription(stressLevel)}`,
    `Workplace Reality Check Day ${day}: ${getStressDescription(stressLevel)}`,
    `Corporate Purgatory Day ${day}: ${getStressDescription(stressLevel)}`
  ];
  
  const hashtags = ['#TheNoticePeriod', '#CorporateLife', '#WorkplaceReality'];
  
  const content = `${scenario}

My choice: "${choice}"

Stress Level: ${stressLevel}/100 ${getStressEmoji(stressLevel)}

Anyone else living this corporate nightmare? Share your worst workplace moments below.

What would you have done in this situation?

${hashtags.join(' ')}

Built with Bolt.new`;
  
  return {
    title: titles[day % titles.length] || titles[0],
    content,
    subreddit: selectedSubreddit,
    day,
    stressLevel,
    hashtags,
    engagement: {
      upvotes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 10,
      shares: Math.floor(Math.random() * 50) + 5
    }
  };
};

const getStressDescription = (stressLevel: number): string => {
  if (stressLevel >= 95) return "Soul Completely Crushed";
  if (stressLevel >= 85) return "Questioning Life Choices";
  if (stressLevel >= 75) return "Burnout Mode Activated";
  if (stressLevel >= 65) return "Reality Setting In";
  if (stressLevel >= 45) return "Optimism Fading";
  if (stressLevel >= 25) return "Still Hopeful";
  return "Blissfully Unaware";
};

const getStressEmoji = (stressLevel: number): string => {
  if (stressLevel >= 90) return "💀";
  if (stressLevel >= 80) return "😰";
  if (stressLevel >= 70) return "😓";
  if (stressLevel >= 60) return "😅";
  if (stressLevel >= 40) return "🤔";
  if (stressLevel >= 20) return "😊";
  return "😄";
};

export const generateShareableAchievement = (step: number, choice: string, stressLevel: number): string => {
  const phase = step <= 8 ? 'Hunt' : step <= 15 ? 'Honeymoon' : step <= 25 ? 'Grind' : 'Choice';
  
  return `Achievement Unlocked: Survived Day ${step} of Corporate Purgatory!

Phase: ${phase} ${getPhaseEmoji(phase)}
Choice: "${choice}"
Stress Level: ${stressLevel}/100 ${getStressEmoji(stressLevel)}

How many days can you survive? Play The Notice Period and find out!

#TheNoticePeriod #CorporateLife #WorkplaceGame

Built with Bolt.new`;
};

const getPhaseEmoji = (phase: string): string => {
  switch (phase) {
    case 'Hunt': return '🎯';
    case 'Honeymoon': return '🍯';
    case 'Grind': return '⚙';
    case 'Choice': return '🚪';
    default: return '📋';
  }
};

export const generateViralMoment = (step: number, title: string, choice: string): ViralMoment => {
  return {
    step,
    title,
    description: `Made a crucial choice that resonated with the community`,
    shareText: `Just had a moment in The Notice Period! "${choice}" - this hit too close to home #TheNoticePeriod #CorporateLife`,
    timestamp: new Date().toISOString(),
    viralScore: Math.floor(Math.random() * 100) + step * 5
  };
};

export const generateLeaderboardData = (): LeaderboardData => {
  return {
    totalPlayers: Math.floor(Math.random() * 10000) + 5000,
    escapedCount: Math.floor(Math.random() * 1000) + 500,
    trappedCount: Math.floor(Math.random() * 2000) + 1000,
    averageStress: Math.floor(Math.random() * 30) + 70,
    mostCommonEscape: "Started own business",
    mostCommonTrap: "Found 'better' corporate job",
    topViralMoments: [
      {
        step: 30,
        title: "The Ultimate Choice",
        description: "Player chose freedom over security",
        shareText: "Just escaped corporate purgatory!",
        timestamp: new Date().toISOString(),
        viralScore: 950
      },
      {
        step: 24,
        title: "The Breaking Point Meeting",
        description: "Pizza party solution to burnout",
        shareText: "They offered pizza for our mental health crisis",
        timestamp: new Date().toISOString(),
        viralScore: 875
      }
    ]
  };
};

export const generateCommunityChallenge = (week: number): string => {
  const challenges = [
    "Micromanagement Monday: Share your worst micromanager story",
    "Toxic Tuesday: What's the most toxic thing you've heard at work?",
    "Wasteful Wednesday: Biggest waste of time meeting you've attended",
    "Throwback Thursday: Share your most cringe LinkedIn post",
    "Freedom Friday: What would you do if you quit tomorrow?",
    "Survival Saturday: How do you cope with Sunday scaries?",
    "Soul-crushing Sunday: What moment made you question everything?"
  ];
  
  return challenges[week % challenges.length] || challenges[0];
};