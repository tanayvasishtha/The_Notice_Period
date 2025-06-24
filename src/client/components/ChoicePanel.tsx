import React from 'react';
import { GameStep } from '../../shared/types/game';

interface ChoicePanelProps {
  currentStep: GameStep;
  onChoice: (choice: string, choiceIndex: number) => void;
  disabled: boolean;
}

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

export const ChoicePanel: React.FC<ChoicePanelProps> = ({ currentStep, onChoice, disabled }) => {
  const choices = currentStep.choices;
  const styling = getBrutalStyling(currentStep.phase);
  
  if (!choices) {
    return (
      <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border}`}>
        <h3 className={`text-lg font-semibold ${styling.accent} mb-4`}>No choices available</h3>
      </div>
    );
  }

  const getChoiceStyle = (index: number) => {
    const baseStyle = "w-full p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (currentStep.phase === 'hunt') {
      switch (index) {
        case 0:
          return `${baseStyle} bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-blue-900 border border-blue-500`;
        case 1:
          return `${baseStyle} bg-gradient-to-r from-sky-300 to-sky-400 hover:from-sky-400 hover:to-sky-500 text-sky-900 border border-sky-500`;
        case 2:
          return `${baseStyle} bg-gradient-to-r from-cyan-300 to-cyan-400 hover:from-cyan-400 hover:to-cyan-500 text-cyan-900 border border-cyan-500`;
        default:
          return `${baseStyle} bg-gradient-to-r from-blue-300 to-sky-300 hover:from-sky-300 hover:to-cyan-300 text-blue-900 border border-blue-500`;
      }
    }
    
    if (currentStep.phase === 'honeymoon') {
      switch (index) {
        case 0:
          return `${baseStyle} bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-yellow-900 border border-yellow-400`;
        case 1:
          return `${baseStyle} bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 text-orange-900 border border-orange-400`;
        case 2:
          return `${baseStyle} bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-900 border border-pink-400`;
        default:
          return `${baseStyle} bg-gradient-to-r from-yellow-200 to-orange-200 hover:from-orange-200 hover:to-pink-200 text-yellow-900 border border-yellow-400`;
      }
    }
    
    if (currentStep.phase === 'grind' || currentStep.phase === 'choice') {
      switch (index) {
        case 0:
          return `${baseStyle} bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-black text-red-100 border border-red-700`;
        case 1:
          return `${baseStyle} bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-red-100 border border-gray-700`;
        case 2:
          return `${baseStyle} bg-gradient-to-r from-black to-red-900 hover:from-red-900 hover:to-black text-red-100 border border-red-800`;
        default:
          return `${baseStyle} bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-red-900 text-red-100 border border-gray-700`;
      }
    }
    
    switch (index) {
      case 0:
        return `${baseStyle} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white`;
      case 1:
        return `${baseStyle} bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white`;
      case 2:
        return `${baseStyle} bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white`;
      default:
        return `${baseStyle} bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white`;
    }
  };

  const getChoiceIcon = (index: number) => {
    switch (index) {
      case 0: return '🎯';
      case 1: return '🤝';
      case 2: return '🎲';
      default: return '📋';
    }
  };

  const getChoiceLabel = (index: number) => {
    switch (index) {
      case 0: return 'Safe Choice';
      case 1: return 'Balanced Choice';
      case 2: return 'Risky Choice';
      default: return 'Choice';
    }
  };

  return (
    <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${currentStep.phase === 'grind' || currentStep.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : currentStep.phase === 'honeymoon' ? 'shadow-xl shadow-yellow-200/30' : currentStep.phase === 'hunt' ? 'shadow-xl shadow-blue-300/30' : ''}`}>
      <h3 className={`text-lg font-semibold ${styling.accent} mb-6 flex items-center`}>
        <span className="text-2xl mr-2">🤔</span>
        What's your move?
      </h3>
      
      <div className="space-y-4">
        {Object.entries(choices).map(([key, choice], index) => {
          if (!choice) return null;
          
          return (
            <button
              key={key}
              onClick={() => onChoice(choice, index)}
              disabled={disabled}
              className={getChoiceStyle(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getChoiceIcon(index)}</div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{getChoiceLabel(index)}</div>
                  <div className="text-sm opacity-90">{choice}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* AI Prompt Display */}
      <div className={`mt-6 ${styling.cardBg} ${currentStep.phase === 'honeymoon' ? 'border border-yellow-200' : currentStep.phase === 'hunt' ? 'border border-blue-300' : ''} rounded-lg p-4`}>
        <h4 className={`text-sm font-semibold ${currentStep.phase === 'hunt' ? 'text-blue-700' : currentStep.phase === 'honeymoon' ? 'text-yellow-600' : 'text-gray-400'} mb-2`}>AI Scenario Generator</h4>
        <p className={`text-xs ${currentStep.phase === 'hunt' ? 'text-blue-800' : currentStep.phase === 'honeymoon' ? 'text-yellow-700' : 'text-gray-500'} italic`}>{currentStep.aiPrompt}</p>
      </div>
      
      {/* Choice Consequences Preview */}
      <div className="mt-4 text-center">
        <p className={`text-xs ${currentStep.phase === 'hunt' ? 'text-blue-700' : currentStep.phase === 'honeymoon' ? 'text-yellow-600' : 'text-gray-400'}`}>
          Your choice will affect your stress level and bank account
        </p>
      </div>
    </div>
  );
};