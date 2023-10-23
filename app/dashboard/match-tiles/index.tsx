import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import { MatchResponse } from '@/interfaces/match.interface';
import { ExpandedMap } from '@/interfaces/ui.type';

const MatchTile = dynamic(() => import('./match-tile'), { ssr: false });

interface MatchTilesProps {
  matches?: MatchResponse[];
  expandedMap: ExpandedMap;
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
        {!matches.length ? (
          <p className="u-text-slate-900 u-font-bold">No matches data found</p>
        ) : (
          matches.map((match) => (
            <MatchTile
              key={match.id}
              match={match}
              isExpanded={expandedMap.get(match.id) ?? false}
              onToggleMatchTile={onToggleMatchTile}
            />
          ))
        )}
      </Suspense>
    </div>
  );
};

export default MatchTiles;
