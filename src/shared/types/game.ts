export type LetterState = 'initial' | 'correct' | 'present' | 'absent';

export type CheckResponse = {
  status: 'error' | 'success';
  message?: string;
  exists?: boolean;
  solved: boolean;
  correct: [LetterState, LetterState, LetterState, LetterState, LetterState];
};

export type InitResponse = {
  status: 'error' | 'success';
  message?: string;
  postId?: string;
};

// Enhanced types for The Notice Period game
export type GamePhase = 'hunt' | 'honeymoon' | 'grind' | 'choice';

export type GameStep = {
  id: number;
  title: string;
  scenario: string;
  aiPrompt: string;
  redditPost: string;
  stressMeter: number;
  bankAccount: number;
  phase: GamePhase;
  choices?: {
    option1: string;
    option2: string;
    option3?: string;
  };
  consequences?: {
    stress: number;
    money: number;
    message: string;
  };
};

export type PlayerProgress = {
  currentStep: number;
  stressLevel: number;
  bankAccount: number;
  choicesMade: string[];
  startDate: string;
  completedSteps: number[];
  phase: GamePhase;
  escaped: boolean | null;
  achievements: string[];
  viralMoments: ViralMoment[];
};

export type GameState = {
  player: PlayerProgress;
  currentStep: GameStep;
  gameComplete: boolean;
  leaderboard?: LeaderboardData;
};

export type RedditPostData = {
  title: string;
  content: string;
  subreddit: string;
  day: number;
  stressLevel: number;
  hashtags: string[];
  engagement: {
    upvotes: number;
    comments: number;
    shares: number;
  };
};

export type ViralMoment = {
  step: number;
  title: string;
  description: string;
  shareText: string;
  timestamp: string;
  viralScore: number;
};

export type LeaderboardData = {
  totalPlayers: number;
  escapedCount: number;
  trappedCount: number;
  averageStress: number;
  mostCommonEscape: string;
  mostCommonTrap: string;
  topViralMoments: ViralMoment[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  shareText: string;
};

export type CommunityChallenge = {
  id: string;
  title: string;
  description: string;
  hashtag: string;
  startDate: string;
  endDate: string;
  participants: number;
  topPosts: RedditPostData[];
};