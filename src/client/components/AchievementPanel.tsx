import React from 'react';
import { Achievement } from '../../shared/types/game';

interface AchievementPanelProps {
  achievements: Achievement[];
  onShare: (achievement: Achievement) => void;
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({ achievements, onShare }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">🏆</span>
        Achievements ({unlockedAchievements.length}/{achievements.length})
      </h3>
      
      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-green-400 mb-3">Unlocked</h4>
          <div className="space-y-3">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-green-400">{achievement.title}</div>
                      <div className="text-sm text-gray-300">{achievement.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onShare(achievement)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-400 mb-3">Locked</h4>
          <div className="space-y-2">
            {lockedAchievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="text-xl grayscale">{achievement.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-400">{achievement.title}</div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                  </div>
                </div>
              </div>
            ))}
            {lockedAchievements.length > 3 && (
              <div className="text-center text-sm text-gray-500 mt-2">
                +{lockedAchievements.length - 3} more achievements to unlock
              </div>
            )}
          </div>
        </div>
      )}

      {unlockedAchievements.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-gray-400">Complete challenges to unlock achievements!</p>
        </div>
      )}
    </div>
  );
};