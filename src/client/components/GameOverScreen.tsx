import React from 'react';
import { PlayerProgress } from '../../shared/types/game';

interface GameOverScreenProps {
  player: PlayerProgress;
  onPlayAgain: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ player, onPlayAgain }) => {
  const getEndingTitle = () => {
    if (player.escaped === true) return "FREEDOM ACHIEVED!";
    if (player.escaped === false) return "THE CYCLE CONTINUES...";
    return "SABBATICAL TAKEN!";
  };

  const getEndingMessage = () => {
    if (player.escaped === true) {
      return "Congratulations! You broke free from corporate purgatory and started your own path. Your entrepreneurial spirit has triumphed over the soul-crushing machine!";
    }
    if (player.escaped === false) {
      return "Welcome to your new company! Don't worry, they're 'different' here. The cycle begins anew, but hey, at least you have experience now... right?";
    }
    return "You've taken a sabbatical to figure things out. Sometimes the best choice is to step back and reassess. Your journey continues outside the corporate world.";
  };

  const getEndingColor = () => {
    if (player.escaped === true) return "from-green-600 to-green-700";
    if (player.escaped === false) return "from-red-600 to-red-700";
    return "from-blue-600 to-blue-700";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {getEndingTitle()}
          </h1>
          <div className={`inline-block px-6 py-3 rounded-full text-xl font-semibold bg-gradient-to-r ${getEndingColor()} text-white`}>
            Game Complete
          </div>
        </div>

        {/* Ending Message */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            {getEndingMessage()}
          </p>
          
          {/* Final Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{player.completedSteps.length}</div>
              <div className="text-sm text-gray-400">Days Survived</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{player.stressLevel}</div>
              <div className="text-sm text-gray-400">Final Stress</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">${player.bankAccount.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Final Balance</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">{player.choicesMade.length}</div>
              <div className="text-sm text-gray-400">Choices Made</div>
            </div>
          </div>
        </div>

        {/* Share Results */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Share Your Journey</h2>
          
          <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-300 italic">
              "Just completed The Notice Period! Survived {player.completedSteps.length} days of corporate purgatory with {player.stressLevel}% stress. 
              {player.escaped === true ? ' Successfully escaped to start my own business!' : 
               player.escaped === false ? ' Got trapped in the cycle again...' : 
               ' Taking a sabbatical to figure things out'}
              
              #TheNoticePeriod #CorporateLife #WorkplaceReality"
            </p>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Share on Reddit
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Share on Twitter
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Share on LinkedIn
            </button>
          </div>
        </div>

        {/* Play Again */}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Experience Corporate Hell Again
          </button>
          
          <p className="text-sm text-gray-400">
            Try different choices and see if you can escape the corporate cycle!
          </p>
        </div>

        {/* Built with Bolt.new Badge */}
        <div className="mt-8">
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