import React from 'react';
import { GameStep, PlayerProgress } from '../../shared/types/game';

interface GameBoardProps {
  currentStep: GameStep;
  player: PlayerProgress;
  loading: boolean;
}

const getPhaseColor = (phase: string) => {
  switch (phase) {
    case 'hunt': return 'from-blue-600 to-blue-700';
    case 'honeymoon': return 'from-yellow-600 to-orange-500';
    case 'grind': return 'from-red-900 to-black';
    case 'choice': return 'from-red-800 to-gray-900';
    default: return 'from-gray-600 to-gray-700';
  }
};

const getPhaseIcon = (phase: string) => {
  switch (phase) {
    case 'hunt': return '🎯';
    case 'honeymoon': return '🍯';
    case 'grind': return '⚙';
    case 'choice': return '🚪';
    default: return '📋';
  }
};

const getStressColor = (stress: number) => {
  if (stress >= 90) return 'text-red-500';
  if (stress >= 70) return 'text-orange-500';
  if (stress >= 50) return 'text-yellow-500';
  return 'text-green-500';
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

export const GameBoard: React.FC<GameBoardProps> = ({ currentStep, player, loading }) => {
  const progressPercentage = ((player.completedSteps.length) / 30) * 100;
  const styling = getBrutalStyling(player.phase);
  
  return (
    <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${player.phase === 'grind' || player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : player.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : player.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${styling.text}`}>Progress</span>
          <span className={`text-sm ${player.phase === 'honeymoon' ? 'text-yellow-600' : player.phase === 'hunt' ? 'text-blue-700' : 'text-gray-400'}`}>{player.completedSteps.length}/30 days</span>
        </div>
        <div className={`w-full ${player.phase === 'grind' || player.phase === 'choice' ? 'bg-red-900' : player.phase === 'honeymoon' ? 'bg-yellow-200' : player.phase === 'hunt' ? 'bg-blue-300' : 'bg-gray-700'} rounded-full h-3`}>
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${getPhaseColor(player.phase)} transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{getPhaseIcon(currentStep.phase)}</div>
        <h2 className={`text-2xl font-bold ${styling.accent} mb-2`}>{currentStep.title}</h2>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getPhaseColor(currentStep.phase)} text-white`}>
          Day {currentStep.id} • {currentStep.phase.toUpperCase()} PHASE
        </div>
      </div>

      {/* Scenario */}
      <div className={`${styling.cardBg} ${player.phase === 'honeymoon' ? 'border border-yellow-200' : player.phase === 'hunt' ? 'border border-blue-300' : player.phase === 'grind' || player.phase === 'choice' ? 'border border-red-800' : ''} rounded-lg p-4 mb-6`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-2`}>Today's Challenge</h3>
        <p className={`${styling.text} leading-relaxed`}>{currentStep.scenario}</p>
      </div>

      {/* Simplified Reddit Post Preview */}
      <div className={`${player.phase === 'hunt' ? 'bg-blue-200/50 border-blue-400' : player.phase === 'honeymoon' ? 'bg-orange-100/50 border-orange-300' : player.phase === 'grind' || player.phase === 'choice' ? 'bg-red-900/20 border-red-700' : 'bg-orange-900/20 border-orange-700'} border rounded-lg p-3`}>
        <h3 className={`text-sm font-semibold ${player.phase === 'hunt' ? 'text-blue-700' : player.phase === 'honeymoon' ? 'text-orange-600' : player.phase === 'grind' || player.phase === 'choice' ? 'text-red-400' : 'text-orange-400'} mb-2`}>Reddit Post</h3>
        <p className={`text-sm ${styling.text} italic`}>{currentStep.redditPost}</p>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-white text-sm">Processing your choice...</p>
          </div>
        </div>
      )}
    </div>
  );
};