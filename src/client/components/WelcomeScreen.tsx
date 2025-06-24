import React from 'react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            The Notice Period
          </h1>
          <p className="text-2xl md:text-3xl text-red-400 font-semibold mb-2">
            Corporate Survival Simulator
          </p>
          <p className="text-lg text-gray-300">
            A satirical 30-step journey through corporate purgatory
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Your Corporate Journey Awaits</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">The Challenge</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Survive 30 days of corporate life</li>
                <li>• Navigate office politics and bureaucracy</li>
                <li>• Watch your stress levels rise</li>
                <li>• Make choices that shape your fate</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">The Outcome</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Escape and start your own business</li>
                <li>• Get trapped in the corporate cycle</li>
                <li>• Share your journey on Reddit</li>
                <li>• Become a workplace legend</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Game Phases */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-blue-400">The Hunt</h3>
            <p className="text-sm text-gray-300">Days 1-8: Job searching optimism</p>
          </div>
          
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🍯</div>
            <h3 className="font-semibold text-yellow-400">Honeymoon</h3>
            <p className="text-sm text-gray-300">Days 9-15: False hope period</p>
          </div>
          
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
            <div className="text-2xl mb-2">⚙</div>
            <h3 className="font-semibold text-red-400">The Grind</h3>
            <p className="text-sm text-gray-300">Days 16-25: Reality sets in</p>
          </div>
          
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🚪</div>
            <h3 className="font-semibold text-purple-400">The Choice</h3>
            <p className="text-sm text-gray-300">Days 26-30: Escape or repeat?</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Begin Your Corporate Nightmare
          </button>
          
          <p className="text-sm text-gray-400">
            Warning: May cause existential dread and sudden urges to quit your job
          </p>
        </div>

        {/* Reddit Integration Notice */}
        <div className="mt-8 bg-orange-900/30 border border-orange-700 rounded-lg p-4">
          <h3 className="font-semibold text-orange-400 mb-2">Reddit Integration</h3>
          <p className="text-sm text-gray-300">
            Your progress will be shared with Reddit communities like r/antiwork and r/cscareerquestions.
            Join the conversation and see how others survive corporate life!
          </p>
        </div>
      </div>
    </div>
  );
};