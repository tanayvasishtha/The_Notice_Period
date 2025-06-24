import React from 'react';
import { LeaderboardData } from '../../shared/types/game';

interface LeaderboardPanelProps {
  leaderboard: LeaderboardData;
  playerViralScore: number;
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({ leaderboard }) => {
  const escapeRate = Math.round((leaderboard.escapedCount / leaderboard.totalPlayers) * 100);
  const trapRate = Math.round((leaderboard.trappedCount / leaderboard.totalPlayers) * 100);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">📊</span>
        Global Stats
      </h3>
      
      {/* Global Statistics */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-white mb-3">Corporate Survival Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{leaderboard.escapedCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Escaped ({escapeRate}%)</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-400">{leaderboard.trappedCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Trapped ({trapRate}%)</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Average Stress Level</span>
            <span className="text-lg font-bold text-orange-400">{leaderboard.averageStress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${leaderboard.averageStress}%` }}
            ></div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Most Common Outcomes</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Escape Route:</span>
              <span className="text-green-400">{leaderboard.mostCommonEscape}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Trap Method:</span>
              <span className="text-red-400">{leaderboard.mostCommonTrap}</span>
            </div>
          </div>
        </div>

        {/* Top Moments */}
        <div>
          <h4 className="font-semibold text-white mb-2">Most Relatable Moments</h4>
          <div className="space-y-2">
            {leaderboard.topViralMoments.slice(0, 2).map((moment, index) => (
              <div key={index} className="bg-orange-900/30 border border-orange-700 rounded-lg p-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-orange-400">Day {moment.step}: {moment.title}</div>
                    <div className="text-xs text-gray-400">{moment.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Challenge */}
      <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <h4 className="font-semibold text-blue-400 mb-2">This Week's Challenge</h4>
        <p className="text-sm text-gray-300">Micromanagement Monday: Share your worst micromanager story</p>
        <div className="text-xs text-gray-400 mt-1">#MicromanagementMonday #TheNoticePeriod</div>
      </div>
    </div>
  );
};