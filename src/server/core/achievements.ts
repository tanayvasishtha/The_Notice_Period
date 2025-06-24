import { Achievement } from '../../shared/types/game';

export const achievements: Achievement[] = [
  {
    id: 'first_day',
    title: 'Corporate Virgin',
    description: 'Survived your first day of corporate hell',
    icon: '🎯',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Corporate Virgin! Just survived my first day of corporate hell. The journey begins... #TheNoticePeriod #CorporateLife'
  },
  {
    id: 'buzzword_master',
    title: 'Buzzword Bingo Champion',
    description: 'Used 10+ corporate buzzwords in a single day',
    icon: '🎪',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Buzzword Bingo Champion! I can now leverage synergistic solutions to optimize paradigm shifts! #CorporateSpeak #TheNoticePeriod'
  },
  {
    id: 'meeting_survivor',
    title: 'Meeting Marathon Survivor',
    description: 'Attended 5+ meetings in a single day',
    icon: '🏃‍♂️',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Meeting Marathon Survivor! 5 meetings, 0 decisions made, 100% time wasted. #MeetingHell #TheNoticePeriod'
  },
  {
    id: 'stress_maxed',
    title: 'Maximum Stress Achieved',
    description: 'Reached 100% stress level',
    icon: '💀',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Maximum Stress Achieved! My soul has officially left the building. #Burnout #TheNoticePeriod #SendHelp'
  },
  {
    id: 'honeymoon_over',
    title: 'Honeymoon Phase Survivor',
    description: 'Completed the honeymoon phase',
    icon: '💔',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Honeymoon Phase Survivor! The optimism is officially dead. Reality has set in. #CorporateReality #TheNoticePeriod'
  },
  {
    id: 'grind_master',
    title: 'Corporate Grind Master',
    description: 'Survived the grind phase',
    icon: '⚙️',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Corporate Grind Master! I am now one with the machine. Resistance is futile. #CorporateGrind #TheNoticePeriod'
  },
  {
    id: 'escape_artist',
    title: 'The Great Escape',
    description: 'Successfully escaped corporate purgatory',
    icon: '🚀',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: The Great Escape! I broke free from corporate purgatory and started my own path! Freedom tastes amazing! #Entrepreneur #TheNoticePeriod #Freedom'
  },
  {
    id: 'cycle_repeater',
    title: 'Cycle Repeater',
    description: 'Got trapped in the corporate cycle again',
    icon: '🔄',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Cycle Repeater! Welcome to my new company - they\'re different here! (Narrator: They weren\'t) #CorporateCycle #TheNoticePeriod'
  },
  {
    id: 'sabbatical_taker',
    title: 'Sabbatical Sage',
    description: 'Took a sabbatical to figure things out',
    icon: '🏃',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Sabbatical Sage! Sometimes the best choice is to step back and reassess. Journey continues! #Sabbatical #TheNoticePeriod'
  },
  {
    id: 'viral_legend',
    title: 'Viral Legend',
    description: 'Achieved over 1000 viral score',
    icon: '👑',
    unlocked: false,
    shareText: '🏆 Achievement Unlocked: Viral Legend! My corporate suffering has reached legendary status! 👑 #ViralLegend #TheNoticePeriod #CorporateInfluencer'
  }
];

export const checkAchievements = (player: any): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  achievements.forEach(achievement => {
    if (player.achievements?.includes(achievement.id)) return;
    
    let unlocked = false;
    
    switch (achievement.id) {
      case 'first_day':
        unlocked = player.completedSteps.length >= 1;
        break;
      case 'buzzword_master':
        unlocked = player.completedSteps.length >= 3;
        break;
      case 'meeting_survivor':
        unlocked = player.completedSteps.length >= 16;
        break;
      case 'stress_maxed':
        unlocked = player.stressLevel >= 100;
        break;
      case 'honeymoon_over':
        unlocked = player.completedSteps.length >= 15;
        break;
      case 'grind_master':
        unlocked = player.completedSteps.length >= 25;
        break;
      case 'escape_artist':
        unlocked = player.escaped === true;
        break;
      case 'cycle_repeater':
        unlocked = player.escaped === false;
        break;
      case 'sabbatical_taker':
        unlocked = player.escaped === null && player.completedSteps.length >= 30;
        break;
      case 'viral_legend':
        const viralScore = player.completedSteps.length * 10 + (player.escaped === true ? 500 : 0);
        unlocked = viralScore >= 1000;
        break;
    }
    
    if (unlocked) {
      newAchievements.push({ ...achievement, unlocked: true });
    }
  });
  
  return newAchievements;
};