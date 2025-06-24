import { GameStep, GamePhase } from '../../shared/types/game';

export const gameSteps: GameStep[] = [
  // PHASE 1: THE HUNT (Steps 1-8) - Optimistic Beginning
  {
    id: 1,
    title: "Create Resume with AI Buzzword Generator",
    scenario: "Use AI to generate the perfect resume filled with 'synergistic solutions' and 'paradigm shifts'. Watch as your authentic self disappears behind corporate speak.",
    aiPrompt: "Generate corporate buzzwords that make you sound important but mean absolutely nothing",
    redditPost: "Day 1: Just updated my resume with AI. I'm apparently a 'dynamic thought leader in disruptive innovation' who 'leverages synergistic solutions' 🤡 What's the most ridiculous buzzword you've seen?",
    stressMeter: 10,
    bankAccount: 100,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Add more buzzwords - 'Blockchain-enabled growth hacker'",
      option2: "Keep it simple and honest",
      option3: "Use AI to write the entire thing"
    }
  },
  {
    id: 2,
    title: "Apply to 47 Jobs, Get 3 Responses",
    scenario: "Send applications into the void. Watch your self-worth decrease with each auto-rejection email that arrives 0.3 seconds after applying.",
    aiPrompt: "Generate increasingly desperate job application emails that show the soul-crushing reality of job hunting",
    redditPost: "Day 2: Applied to 47 jobs today. Got 3 rejections and 44 instances of ghosting 👻 The rejection emails are faster than my internet speed. Anyone else living this nightmare?",
    stressMeter: 25,
    bankAccount: 95,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Apply to 50 more jobs immediately",
      option2: "Take a mental health day",
      option3: "Start questioning your life choices"
    }
  },
  {
    id: 3,
    title: "LinkedIn Optimization Hell",
    scenario: "Transform your LinkedIn into a corporate virtue-signaling machine. Post about 'lessons learned' from getting rejected.",
    aiPrompt: "Generate cringe LinkedIn posts about how rejection builds character",
    redditPost: "Day 3: Posted on LinkedIn about how rejection builds character. Got 12 'inspirational' comments from MLM recruiters and life coaches 📈 The cringe is real",
    stressMeter: 30,
    bankAccount: 90,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Post daily 'motivational' content",
      option2: "Connect with everyone you've ever met",
      option3: "Share a humble-brag success story"
    }
  },
  {
    id: 4,
    title: "The Recruiter Gauntlet",
    scenario: "Navigate calls with recruiters who clearly didn't read your resume. They want to discuss a 'junior' role for someone with 8 years experience.",
    aiPrompt: "Generate recruiter conversations that completely miss the point and waste everyone's time",
    redditPost: "Day 4: Recruiter asked if I'd be interested in a 'junior' role. I have 8 years experience. They said 'everyone starts somewhere' 🙃 I can't even...",
    stressMeter: 40,
    bankAccount: 85,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Politely explain your experience level",
      option2: "Hang up immediately",
      option3: "Play along and see how low they'll go"
    }
  },
  {
    id: 5,
    title: "Interview Prep Overdrive",
    scenario: "Practice answering 'Where do you see yourself in 5 years?' for the 100th time. Spoiler: Not here.",
    aiPrompt: "Generate absurd interview questions that real companies actually ask",
    redditPost: "Day 5: Practicing interview answers. Apparently I need to be 'passionate about data entry' and 'excited by spreadsheets' 📊 My soul is already leaving my body",
    stressMeter: 45,
    bankAccount: 80,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Memorize 50 more behavioral questions",
      option2: "Practice your fake enthusiasm face",
      option3: "Research the company's 'culture' (aka ping pong tables)"
    }
  },
  {
    id: 6,
    title: "The Panel Interview Nightmare",
    scenario: "Face 6 people who ask the same question in different ways. Experience the joy of explaining your background 6 times to people who aren't listening.",
    aiPrompt: "Generate panel interview scenarios that test nothing useful but waste maximum time",
    redditPost: "Day 6: Panel interview today. 6 people, 2 hours, 47 variations of 'tell us about yourself' 🎭 I'm pretty sure one person was asleep",
    stressMeter: 55,
    bankAccount: 75,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Give the same answer with slight variations",
      option2: "Ask them to compare notes first",
      option3: "Suggest they pick one spokesperson"
    }
  },
  {
    id: 7,
    title: "Salary Negotiation Anxiety",
    scenario: "Try to negotiate without seeming 'difficult' or 'ungrateful'. Learn that asking for market rate makes you 'not a culture fit'.",
    aiPrompt: "Generate salary negotiation scenarios that heavily favor the company",
    redditPost: "Day 7: They asked my salary expectations. I said market rate. They said 'we're like a family here' and offered 20% below market 👨‍👩‍👧‍👦 Red flags everywhere",
    stressMeter: 60,
    bankAccount: 70,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Accept the 'family' rate",
      option2: "Counter with actual market data",
      option3: "Ask about the 'unlimited PTO' (that no one takes)"
    }
  },
  {
    id: 8,
    title: "The Offer Acceptance",
    scenario: "Finally get an offer and convince yourself this place will be different. Ignore all the red flags because you need money.",
    aiPrompt: "Generate optimistic thoughts about a clearly problematic workplace",
    redditPost: "Day 8: GOT THE JOB! 🎉 Sure, the salary is low and they mentioned 'wearing many hats,' but I'm sure it'll be great! Right? RIGHT? 😅",
    stressMeter: 35,
    bankAccount: 500,
    phase: 'hunt' as GamePhase,
    choices: {
      option1: "Sign immediately before they change their mind",
      option2: "Negotiate one more time",
      option3: "Celebrate with expensive dinner you can't afford"
    }
  },

  // PHASE 2: HONEYMOON PERIOD (Steps 9-15) - False Hope
  {
    id: 9,
    title: "First Day Orientation Overload",
    scenario: "Learn 47 different systems, none of which work together. Sign 15 NDAs while HR explains the 'family culture'.",
    aiPrompt: "Generate absurd corporate orientation scenarios that overwhelm new employees",
    redditPost: "Day 9: HR just explained our 'family culture' while making me sign 15 NDAs. Also learned we use 12 different software systems for one task 🤯 This is fine",
    stressMeter: 30,
    bankAccount: 520,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Take detailed notes on everything",
      option2: "Nod and smile, figure it out later",
      option3: "Ask why they need so many systems"
    }
  },
  {
    id: 10,
    title: "Meet Your New 'Family'",
    scenario: "Discover your coworkers are either dead inside or aggressively cheerful. There's no in-between.",
    aiPrompt: "Generate workplace personality types that slowly drain your soul",
    redditPost: "Day 10: Met the team! There's Oversharer Sarah, Micromanager Mike, and Dead-Eyes Dave who's been here 15 years 👥 Dave hasn't blinked once",
    stressMeter: 35,
    bankAccount: 540,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Try to befriend everyone",
      option2: "Keep your head down and work",
      option3: "Start a group chat to complain"
    }
  },
  {
    id: 11,
    title: "The Desk Assignment Lottery",
    scenario: "Get assigned the worst desk in the office with broken everything. It's next to the printer, under the AC vent, with a wobbly chair from 1987.",
    aiPrompt: "Generate office space problems that significantly affect productivity and morale",
    redditPost: "Day 11: My desk is next to the printer, under the AC vent, with a wobbly chair from 1987. Living the dream! 🖥️❄️ At least the printer jams give me breaks",
    stressMeter: 40,
    bankAccount: 560,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Request a different desk",
      option2: "Bring your own cushion and space heater",
      option3: "Embrace the chaos"
    }
  },
  {
    id: 12,
    title: "Training That Trains Nothing",
    scenario: "Sit through 8 hours of compliance training that could be a 10-minute video. Learn 47 ways to say nothing.",
    aiPrompt: "Generate pointless corporate training scenarios that waste time",
    redditPost: "Day 12: Completed 'Workplace Excellence Through Synergistic Communication' training. I now know 47 ways to say nothing 📚 My brain hurts",
    stressMeter: 45,
    bankAccount: 580,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Take the quiz seriously",
      option2: "Multitask during the videos",
      option3: "Ask detailed questions to waste everyone's time"
    }
  },
  {
    id: 13,
    title: "Your First Real Assignment",
    scenario: "Get a project with unclear requirements and impossible deadlines. When you ask for details, they say 'you're the expert!'",
    aiPrompt: "Generate vague project descriptions that set employees up for failure",
    redditPost: "Day 13: First project! 'Make the thing better by Friday.' When I asked for details, they said 'you're the expert!' 📋❓ What thing? Better how?",
    stressMeter: 55,
    bankAccount: 600,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Ask for clarification repeatedly",
      option2: "Wing it and hope for the best",
      option3: "Document everything in case it goes wrong"
    }
  },
  {
    id: 14,
    title: "The Coffee Politics",
    scenario: "Navigate the complex social hierarchy of who makes coffee and when. Break the unwritten rotation and face Karen's wrath.",
    aiPrompt: "Generate office coffee culture drama that reveals deeper workplace dynamics",
    redditPost: "Day 14: Apparently there's an unwritten coffee rotation. I broke it. Karen from accounting hasn't spoken to me since ☕😠 The coffee wars have begun",
    stressMeter: 50,
    bankAccount: 620,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Apologize and join the rotation",
      option2: "Bring your own coffee maker",
      option3: "Start a coffee revolution"
    }
  },
  {
    id: 15,
    title: "First Team Meeting Reality Check",
    scenario: "Realize every meeting could have been an email, but emails become meetings. Enter the infinite loop of corporate communication.",
    aiPrompt: "Generate circular meeting logic that wastes maximum time",
    redditPost: "Day 15: Team meeting to discuss the email about the meeting we're planning to discuss the project we talked about yesterday 🔄 I'm trapped in a loop",
    stressMeter: 60,
    bankAccount: 640,
    phase: 'honeymoon' as GamePhase,
    choices: {
      option1: "Suggest more efficient communication",
      option2: "Embrace the meeting culture",
      option3: "Start taking meeting bingo cards"
    }
  },

  // PHASE 3: THE GRIND (Steps 16-25) - Reality Sets In
  {
    id: 16,
    title: "Endless Meeting Simulator",
    scenario: "Attend meetings about meetings. Discover the true meaning of 'circle back' and 'take this offline'.",
    aiPrompt: "Generate meeting topics that could have been emails but somehow require 2 hours of discussion",
    redditPost: "Day 16: Just finished a 2-hour meeting to plan a 1-hour meeting about scheduling meetings. We'll circle back on the action items 🔄 Send help",
    stressMeter: 70,
    bankAccount: 660,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Suggest a meeting about reducing meetings",
      option2: "Start a drinking game for buzzwords",
      option3: "Quietly update your resume during meetings"
    }
  },
  {
    id: 17,
    title: "Deadline Impossible",
    scenario: "Get assigned a 3-month project with a 1-week deadline. The system you need to overhaul was built in 1987 and nobody knows how it works.",
    aiPrompt: "Generate impossible timeline scenarios that ignore reality",
    redditPost: "Day 17: Boss wants a complete system overhaul by Friday. It's Wednesday. The system was built in 1987. Send help 🆘 Also, no documentation exists",
    stressMeter: 80,
    bankAccount: 680,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Work 80-hour weeks to make it happen",
      option2: "Explain why it's impossible",
      option3: "Start looking for a new job"
    }
  },
  {
    id: 18,
    title: "The Micromanager Emerges",
    scenario: "Your boss starts tracking your bathroom breaks and keystrokes. Big Brother is watching, and he's disappointed in your productivity.",
    aiPrompt: "Generate micromanagement scenarios that destroy employee morale",
    redditPost: "Day 18: Boss installed keystroke monitoring software. Also asked why I was away from my desk for 7 minutes. I was in the bathroom 🚽👀 Privacy is dead",
    stressMeter: 85,
    bankAccount: 700,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Document everything for HR",
      option2: "Malicious compliance - ask permission for everything",
      option3: "Start typing random letters to boost keystroke count"
    }
  },
  {
    id: 19,
    title: "Performance Review Gaslighting",
    scenario: "Get criticized for things you were never told were important. Apparently you should have been 'more proactive' about tasks that didn't exist.",
    aiPrompt: "Generate unfair performance review scenarios that gaslight employees",
    redditPost: "Day 19: Performance review! Apparently I should have been 'more proactive' about tasks I didn't know existed. Also, I'm 'not a team player' 📊😵 What team?",
    stressMeter: 90,
    bankAccount: 720,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Accept the feedback and improve",
      option2: "Challenge the review with documentation",
      option3: "Start planning your exit strategy"
    }
  },
  {
    id: 20,
    title: "The Promotion Carrot",
    scenario: "Get promised a promotion that never comes, but more responsibilities do. The carrot is always just out of reach.",
    aiPrompt: "Generate false promotion promises that keep employees trapped",
    redditPost: "Day 20: Boss said promotion is 'just around the corner' while giving me three more people's jobs. The corner is apparently in another dimension 🥕",
    stressMeter: 85,
    bankAccount: 740,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Take on more work to prove yourself",
      option2: "Ask for the promotion timeline in writing",
      option3: "Refuse additional responsibilities without promotion"
    }
  },
  {
    id: 21,
    title: "Office Politics Minefield",
    scenario: "Navigate competing factions and unspoken alliances. Accidentally sit at the wrong lunch table and become part of the 'anti-Karen faction'.",
    aiPrompt: "Generate office politics scenarios that divide workplaces",
    redditPost: "Day 21: Accidentally sat at the wrong lunch table. Apparently I'm now part of the 'anti-Karen faction' in the great printer war of 2025 🏴‍☠️ I just wanted soup",
    stressMeter: 75,
    bankAccount: 760,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Choose a side and commit",
      option2: "Stay neutral and eat lunch alone",
      option3: "Start your own faction"
    }
  },
  {
    id: 22,
    title: "The Burnout Begins",
    scenario: "Start forgetting what you used to enjoy outside of work. Your idea of fun is now sleeping until 10 AM on weekends.",
    aiPrompt: "Generate burnout symptoms and soul-crushing realizations",
    redditPost: "Day 22: Realized I haven't had a hobby in 6 months. My idea of fun is now sleeping until 10 AM on weekends 😴 What is joy?",
    stressMeter: 95,
    bankAccount: 780,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Try to force yourself to have hobbies",
      option2: "Accept that work is your life now",
      option3: "Book a vacation day to remember who you are"
    }
  },
  {
    id: 23,
    title: "Layoff Rumors and Paranoia",
    scenario: "Hear whispers about 'restructuring' and 'right-sizing'. Everyone's updating LinkedIn and the printer is getting more use than usual.",
    aiPrompt: "Generate layoff anxiety scenarios that create workplace paranoia",
    redditPost: "Day 23: CEO mentioned 'optimizing human resources' in the all-hands. Everyone's updating LinkedIn. The printer is getting more use than usual 📄💼 Panic mode",
    stressMeter: 100,
    bankAccount: 800,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Work harder to prove your value",
      option2: "Start networking aggressively",
      option3: "Embrace the chaos and see what happens"
    }
  },
  {
    id: 24,
    title: "The Breaking Point Meeting",
    scenario: "Sit through a meeting where leadership explains why your concerns don't matter. Solution: 'Work smarter, not harder' and a pizza party.",
    aiPrompt: "Generate tone-deaf leadership responses to employee concerns",
    redditPost: "Day 24: Leadership addressed our concerns about workload. Solution: 'Work smarter, not harder' and a pizza party. The pizza was Little Caesars 🍕😭",
    stressMeter: 100,
    bankAccount: 820,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Appreciate the pizza and soldier on",
      option2: "Start documenting everything for a potential lawsuit",
      option3: "Begin your escape plan"
    }
  },
  {
    id: 25,
    title: "The Sunday Scaries Peak",
    scenario: "Dread Sunday evenings more than anything else in life. Monday is in 14 hours and your soul is already leaving your body.",
    aiPrompt: "Generate Sunday anxiety scenarios that capture workplace dread",
    redditPost: "Day 25: Sunday 6 PM hits different now. It's like a countdown to my soul leaving my body. Monday is in 14 hours 😱⏰ Why did I choose this life?",
    stressMeter: 100,
    bankAccount: 840,
    phase: 'grind' as GamePhase,
    choices: {
      option1: "Try meditation and self-care",
      option2: "Drink wine and pretend Monday isn't coming",
      option3: "Start planning your escape"
    }
  },

  // PHASE 4: THE CHOICE (Steps 26-30) - Escape or Repeat
  {
    id: 26,
    title: "The Epiphany Moment",
    scenario: "Realize you've become everything you swore you'd never become. Catch yourself saying 'let's take this offline' unironically.",
    aiPrompt: "Generate moments of corporate soul-crushing realization",
    redditPost: "Day 26: Caught myself saying 'let's take this offline' unironically. I've become the corporate drone I used to mock 🤖 Who am I anymore?",
    stressMeter: 100,
    bankAccount: 860,
    phase: 'choice' as GamePhase,
    choices: {
      option1: "Embrace your corporate transformation",
      option2: "Fight to remember who you used to be",
      option3: "Start planning your escape"
    }
  },
  {
    id: 27,
    title: "The Side Hustle Temptation",
    scenario: "Consider starting your own business vs. finding another corporate job. Corporate benefits are nice, but your soul is dying.",
    aiPrompt: "Generate entrepreneurial vs. corporate safety internal debates",
    redditPost: "Day 27: Been thinking about that business idea again. But corporate benefits are nice. But my soul is dying. But health insurance... 🤔💭 The eternal struggle",
    stressMeter: 90,
    bankAccount: 880,
    phase: 'choice' as GamePhase,
    choices: {
      option1: "Start the side hustle while keeping your job",
      option2: "Play it safe and stay corporate",
      option3: "Take the leap and quit"
    }
  },
  {
    id: 28,
    title: "The Final Straw",
    scenario: "Experience the one thing that makes you question everything. Boss asks you to work this weekend to fix a problem they created.",
    aiPrompt: "Generate final straw workplace scenarios that break people",
    redditPost: "Day 28: Boss just asked me to work this weekend to fix a problem they created by ignoring my warnings last month. I can feel my last nerve snapping 🔥",
    stressMeter: 100,
    bankAccount: 900,
    phase: 'choice' as GamePhase,
    choices: {
      option1: "Work the weekend and complain quietly",
      option2: "Refuse and face the consequences",
      option3: "Use this as motivation to escape"
    }
  },
  {
    id: 29,
    title: "The Point of No Return",
    scenario: "Make the decision that will define your future. Do you stay in corporate purgatory or risk everything for freedom?",
    aiPrompt: "Generate life-changing decision scenarios with high stakes",
    redditPost: "Day 29: Standing at the crossroads. Do I stay in corporate purgatory or risk everything for freedom? The choice is mine 🛤️ What would you do?",
    stressMeter: 100,
    bankAccount: 920,
    phase: 'choice' as GamePhase,
    choices: {
      option1: "Choose security and stay corporate",
      option2: "Choose freedom and start your own path",
      option3: "Look for another corporate job (restart the cycle)"
    }
  },
  {
    id: 30,
    title: "THE ULTIMATE CHOICE",
    scenario: "The moment of truth. Will you escape corporate purgatory forever, or welcome to your new company - they're different, they promise!",
    aiPrompt: "Generate the final choice between freedom and repeating the corporate cycle",
    redditPost: "Day 30: The moment of truth. Freedom or another corporate prison? The choice that defines everything 🚪🔓 This is it. This is everything.",
    stressMeter: 100,
    bankAccount: 1000,
    phase: 'choice' as GamePhase,
    choices: {
      option1: "🚀 ESCAPE: Start your own business and break free!",
      option2: "🔄 REPEAT: Join another company (they're different, they promise!)",
      option3: "🏃 FLEE: Take a sabbatical and figure it out"
    }
  }
];

export const getStepById = (id: number): GameStep | undefined => {
  return gameSteps.find(step => step.id === id);
};

export const getStepsByPhase = (phase: GamePhase): GameStep[] => {
  return gameSteps.filter(step => step.phase === phase);
};

export const getTotalSteps = (): number => {
  return gameSteps.length;
};

export const getPhaseProgress = (currentStep: number): { phase: GamePhase; progress: number; total: number } => {
  if (currentStep <= 8) return { phase: 'hunt', progress: currentStep, total: 8 };
  if (currentStep <= 15) return { phase: 'honeymoon', progress: currentStep - 8, total: 7 };
  if (currentStep <= 25) return { phase: 'grind', progress: currentStep - 15, total: 10 };
  return { phase: 'choice', progress: currentStep - 25, total: 5 };
};