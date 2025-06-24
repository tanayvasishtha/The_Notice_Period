import React, { useState } from 'react';

interface ViralPanelProps {
  content: {
    post: any;
    achievement: string;
    stressChange: number;
    moneyChange: number;
  };
}

export const ViralPanel: React.FC<ViralPanelProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<'post' | 'achievement' | 'stats'>('post');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">🔥</span>
        Viral Content Generated
      </h3>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('post')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'post' 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          📱 Reddit Post
        </button>
        <button
          onClick={() => setActiveTab('achievement')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'achievement' 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🏆 Achievement
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'stats' 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          📊 Impact
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-900/50 rounded-lg p-4">
        {activeTab === 'post' && content.post && (
          <div>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-orange-400">r/{content.post.subreddit}</h4>
              <button
                onClick={() => copyToClipboard(`${content.post.title}\n\n${content.post.content}`)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <h5 className="font-medium text-white mb-2">{content.post.title}</h5>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{content.post.content}</p>
          </div>
        )}

        {activeTab === 'achievement' && (
          <div>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-orange-400">Shareable Achievement</h4>
              <button
                onClick={() => copyToClipboard(content.achievement)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{content.achievement}</p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h4 className="font-semibold text-orange-400 mb-3">Choice Impact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${content.stressChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {content.stressChange > 0 ? '+' : ''}{content.stressChange}
                </div>
                <div className="text-xs text-gray-400">Stress Change</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${content.moneyChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {content.moneyChange > 0 ? '+' : ''}${content.moneyChange}
                </div>
                <div className="text-xs text-gray-400">Money Change</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Buttons */}
      <div className="flex space-x-2 mt-4">
        <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Share on Reddit
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Share on Twitter
        </button>
      </div>
    </div>
  );
};