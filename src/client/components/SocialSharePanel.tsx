import React, { useState } from 'react';

interface SocialSharePanelProps {
  gameState: any;
  viralScore: number;
}

export const SocialSharePanel: React.FC<SocialSharePanelProps> = ({ gameState }) => {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const phase = gameState.player.phase.toUpperCase();
    const stress = gameState.player.stressLevel;
    const day = gameState.player.completedSteps.length;
    
    return `Day ${day} of Corporate Survival Challenge!

Phase: ${phase} ${getPhaseEmoji(gameState.player.phase)}
Stress Level: ${stress}/100 ${getStressEmoji(stress)}

Currently surviving: "${gameState.currentStep.title}"

Anyone else living this corporate nightmare?

Play "The Notice Period" and see how long you can survive!

#TheNoticePeriod #CorporateLife #WorkplaceReality #AntiWork

Built with Bolt.new`;
  };

  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'hunt': return '🎯';
      case 'honeymoon': return '🍯';
      case 'grind': return '⚙';
      case 'choice': return '🚪';
      default: return '📋';
    }
  };

  const getStressEmoji = (stress: number) => {
    if (stress >= 90) return '💀';
    if (stress >= 70) return '😰';
    if (stress >= 50) return '😅';
    return '😊';
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareToReddit = () => {
    const text = encodeURIComponent(generateShareText());
    const url = `https://www.reddit.com/r/antiwork/submit?title=${encodeURIComponent(`Day ${gameState.player.completedSteps.length} of Corporate Survival Challenge`)}&text=${text}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(generateShareText().substring(0, 280));
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(generateShareText());
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`;
    window.open(url, '_blank');
  };

  const getBrutalStyling = (phase: string) => {
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

  const styling = getBrutalStyling(gameState.player.phase);

  return (
    <div className={`${styling.background} backdrop-blur-sm rounded-2xl p-6 border ${styling.border} ${gameState.player.phase === 'grind' || gameState.player.phase === 'choice' ? 'shadow-2xl shadow-red-900/50' : ''}`}>
      <h3 className={`text-lg font-semibold ${styling.accent} mb-4 flex items-center`}>
        <span className="text-2xl mr-2">📱</span>
        Share Your Journey
      </h3>
      
      {/* Preview */}
      <div className={`${styling.cardBg} rounded-lg p-4 mb-4`}>
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Preview</h4>
        <p className={`text-sm ${styling.text} whitespace-pre-wrap`}>{generateShareText()}</p>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        <button
          onClick={shareToReddit}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>📱</span>
          <span>Share on Reddit</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={shareToTwitter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <span>🐦</span>
            <span>Twitter</span>
          </button>
          
          <button
            onClick={shareToLinkedIn}
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </button>
        </div>
        
        <button
          onClick={copyToClipboard}
          className={`w-full ${copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-700'} text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2`}
        >
          <span>{copied ? '✅' : '📋'}</span>
          <span>{copied ? 'Copied!' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
};