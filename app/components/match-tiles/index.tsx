'use client';

import { Suspense, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import { MatchResponse } from '@/interfaces/match.interface';

const MatchTile = dynamic(() => import('./match-tile'), { ssr: false });

interface MatchTilesProps {
  matches?: MatchResponse[];
}

const MatchTiles = ({ matches = [] }: MatchTilesProps) => {
  const initialExpandedMap: Record<number, boolean> = useMemo(
    () =>
      matches.reduce((subMap, match) => ({ ...subMap, [match.id]: false }), {}),
    [matches],
  );

  const [expandedMap, setExpandedMap] = useState(initialExpandedMap);

  const handleToggleMatchTile = (matchId: number) => {
    setExpandedMap((previousMap) => {
      return { ...previousMap, [matchId]: !previousMap[matchId] };
    });
  };

  return (
    <div className="u-py-5 u-px-7 u-bg-green-100 u-rounded-xl u-flex u-flex-col u-gap-5">
      <Suspense fallback={<Loading />}>
        {!matches.length
          ? 'No matches data found'
          : matches.map((match, idx) => (
              <MatchTile
                key={`${idx}-${match.id}`}
                match={match}
                isExpanded={expandedMap[match.id]}
                onToggleMatchTile={handleToggleMatchTile}
              />
            ))}
      </Suspense>
    </div>
  );
};

export default MatchTiles;
