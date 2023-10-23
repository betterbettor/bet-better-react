'use client';

import { useMemo, useState } from 'react';
import MatchTiles from '../match-tiles';
import { MatchResponse } from '@/interfaces/match.interface';
import { ExpandedMapStates } from '@/interfaces/ui.type';

interface DashboardProps {
  matches: MatchResponse[];
}

const Dashboard = ({ matches }: DashboardProps) => {
  const expandedMapStates: ExpandedMapStates = useMemo(
    () =>
      matches.reduce(
        (states, match) => ({
          ALL_EXPANDED: { ...states.ALL_EXPANDED, [match.id]: true },
          ALL_COLLAPSED: { ...states.ALL_COLLAPSED, [match.id]: false },
        }),
        { ALL_EXPANDED: {}, ALL_COLLAPSED: {} },
      ),
    [matches],
  );

  const [expandedMap, setExpandedMap] = useState(
    expandedMapStates.ALL_COLLAPSED,
  );

  const hasAllTilesExpanded = useMemo(() => {
    return matches.every((match) => expandedMap[match.id]);
  }, [expandedMap, matches]);

  const handleToggleAll = () => {
    setExpandedMap(
      hasAllTilesExpanded
        ? expandedMapStates.ALL_COLLAPSED
        : expandedMapStates.ALL_EXPANDED,
    );
  };

  const handleToggleMatchTile = (matchId: number) => {
    setExpandedMap((previousMap) => {
      return { ...previousMap, [matchId]: !previousMap[matchId] };
    });
  };

  return (
    <div>
      <div className="u-py-5">
        <input
          type="text"
          className="u-py-3 u-px-7 u-w-full u-bg-green-300 u-rounded-full"
          placeholder="Search for a team"
        />
      </div>

      <button
        className="u-block u-ml-auto u-mb-5 u-py-3 u-px-7 u-bg-green-900 u-rounded"
        onClick={handleToggleAll}
      >
        {hasAllTilesExpanded ? 'Collapse' : 'Expand'} All
      </button>

      <MatchTiles
        matches={matches}
        expandedMap={expandedMap}
        onToggleMatchTile={handleToggleMatchTile}
      />
    </div>
  );
};

export default Dashboard;
