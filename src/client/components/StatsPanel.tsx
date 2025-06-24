import React from 'react';
import { PlayerProgress } from '../../shared/types/game';

interface StatsPanelProps {
  player: PlayerProgress;
}

const getStressColor = (stress: number) => {
  if (stress >= 90) return 'text-red-500';
  if (stress >= 70) return 'text-orange-500';
  if (stress >= 50) return 'text-yellow-500';
  return 'text-green-500';
};

const getStressEmoji = (stress: number) => {
  if (stress >= 90) return '💀';
  if (stress >= 70) return '😰';
  if (stress >= 50) return '😅';
  if (stress >= 30) return '🙂';
  return '😊';
};

const getStressDescription = (stress: number) => {
  if (stress >= 95) return 'Soul Completely Crushed';
  if (stress >= 85) return 'Questioning Life Choices';
  if (stress >= 75) return 'Burnout Mode Activated';
  if (stress >= 65) return 'Reality Setting In';
  if (stress >= 45) return 'Optimism Fading';
  if (stress >= 25) return 'Still Hopeful';
  return 'Blissfully Unaware';
};

const getHuntStyling = () => {
  return {
    background: 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300',
    border: 'border-blue-400',
    text: 'text-blue-900',
    accent: 'text-blue-800',
    cardBg: 'bg-blue-200/50'
  };
};

const getHoneymoonStyling = () => {
  return {
    background: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50',
    border: 'border-yellow-300',
    text: 'text-yellow-900',
    accent: 'text-yellow-700',
    cardBg: 'bg-yellow-100/50'
  };
};

const getBrutalStyling = (phase: string) => {
  if (phase === 'hunt') {
    return getHuntStyling();
  }
  if (phase === 'honeymoon') {
    return getHoneymoonStyling();
  }
  if (phase === 'grind' || phase === 'choice') {
    return {
      background: 'bg-gradient-to-br from-red-900 via-black to-gray-900',
      border: 'border-red-800',
      text: 'text-red-100',
      accent: 'text-red-400',
      cardBg: 'bg-red-950/50'
    };
  }
  return {
    background: 'bg-gray-800/50',
    border: 'border-gray-700',
    text: 'text-white',
    accent: 'text-white',
    cardBg: 'bg-gray-900/50'
  };
};

export const StatsPanel: React.FC<StatsPanelProps> = ({ player }) => {
  const daysSurvived = player.completedSteps.length;
  const startDate = new Date(player.startDate);
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const styling = getBrutalStyling(player.phase);

  return (
    <div className="space-y-4">
      {/* Stress Meter */}
      <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${player.phase === 'grind' || player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : player.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : player.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-4 flex items-center`}>
          <span className="text-2xl mr-2">{getStressEmoji(player.stressLevel)}</span>
          Stress Level
        </h3>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${styling.text}`}>Current Stress</span>
            <span className={`text-lg font-bold ${getStressColor(player.stressLevel)}`}>
              {player.stressLevel}/100
            </span>
          </div>
          <div className={`w-full ${player.phase === 'grind' || player.phase === 'choice' ? 'bg-red-900' : player.phase === 'honeymoon' ? 'bg-yellow-200' : player.phase === 'hunt' ? 'bg-blue-300' : 'bg-gray-700'} rounded-full h-4`}>
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                player.stressLevel >= 80 ? 'bg-red-500' :
                player.stressLevel >= 60 ? 'bg-orange-500' :
                player.stressLevel >= 40 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${player.stressLevel}%` }}
            ></div>
          </div>
        </div>
        
        <p className={`text-sm font-medium ${getStressColor(player.stressLevel)}`}>
          {getStressDescription(player.stressLevel)}
        </p>
      </div>

      {/* Bank Account */}
      <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${player.phase === 'grind' || player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : player.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : player.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-4 flex items-center`}>
          <span className="text-2xl mr-2">💰</span>
          Bank Account
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            ${player.bankAccount.toLocaleString()}
          </div>
          <p className={`text-sm ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>
            {player.bankAccount > 500 ? 'Building wealth' : 'Living paycheck to paycheck'}
          </p>
        </div>
      </div>

      {/* Survival Stats */}
      <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${player.phase === 'grind' || player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : player.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : player.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-4 flex items-center`}>
          <span className="text-2xl mr-2">📊</span>
          Survival Stats
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={styling.text}>Days Survived</span>
            <span className={`${styling.accent} font-semibold`}>{daysSurvived}/30</span>
          </div>
          
          <div className="flex justify-between">
            <span className={styling.text}>Current Phase</span>
            <span className={`${styling.accent} font-semibold capitalize`}>{player.phase}</span>
          </div>
          
          <div className="flex justify-between">
            <span className={styling.text}>Choices Made</span>
            <span className={`${styling.accent} font-semibold`}>{player.choicesMade.length}</span>
          </div>
          
          <div className="flex justify-between">
            <span className={styling.text}>Started</span>
            <span className={`${styling.accent} font-semibold`}>
              {daysSinceStart === 0 ? 'Today' : `${daysSinceStart} days ago`}
            </span>
          </div>
        </div>
      </div>

      {/* Achievement Preview */}
      <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${player.phase === 'grind' || player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : player.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : player.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-4 flex items-center`}>
          <span className="text-2xl mr-2">🏆</span>
          Next Milestone
        </h3>
        
        <div className="text-center">
          {daysSurvived < 10 && (
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <p className={`text-sm ${styling.text}`}>Survive 10 days</p>
              <p className={`text-xs ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>{10 - daysSurvived} days to go</p>
            </div>
          )}
          
          {daysSurvived >= 10 && daysSurvived < 20 && (
            <div>
              <div className="text-2xl mb-2">⚙</div>
              <p className={`text-sm ${styling.text}`}>Reach the grind phase</p>
              <p className={`text-xs ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>{20 - daysSurvived} days to go</p>
            </div>
          )}
          
          {daysSurvived >= 20 && daysSurvived < 30 && (
            <div>
              <div className="text-2xl mb-2">🚪</div>
              <p className={`text-sm ${styling.text}`}>Face the ultimate choice</p>
              <p className={`text-xs ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>{30 - daysSurvived} days to go</p>
            </div>
          )}
          
          {daysSurvived >= 30 && (
            <div>
              <div className="text-2xl mb-2">👑</div>
              <p className={`text-sm ${styling.text}`}>Corporate Survivor</p>
              <p className={`text-xs ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>Achievement unlocked!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};