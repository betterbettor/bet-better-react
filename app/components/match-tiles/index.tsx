import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import { MatchResponse } from '@/interfaces/match.interface';

const MatchTile = dynamic(() => import('./match-tile'), { ssr: false });

interface MatchTilesProps {
  matches?: MatchResponse[];
  expandedMap: Record<number, boolean>;
  onToggleMatchTile: (matchId: number) => void;
}

const MatchTiles = ({
  matches = [],
  expandedMap,
  onToggleMatchTile,
}: MatchTilesProps) => {
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
                onToggleMatchTile={onToggleMatchTile}
              />
            ))}
      </Suspense>
    </div>
  );
};

export default MatchTiles;
