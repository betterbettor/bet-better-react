import dynamic from 'next/dynamic';
import Loading from '@/app/loading';
import { Match } from '@/interfaces/match.interface';
import { ExpandedMap } from '@/interfaces/ui.type';

const MatchTile = dynamic(() => import('./match-tile'), {
  ssr: false,
  loading: () => <Loading />,
});

interface MatchTilesProps {
  matches?: Match[];
  expandedMap: ExpandedMap;
  onToggleMatchTile: (matchId: number) => void;
}

const MatchTiles = ({
  matches = [],
  expandedMap,
  onToggleMatchTile,
}: MatchTilesProps) => {
  return (
    <div className="u-flex u-flex-col u-gap-3 sm:u-gap-5">
      {!matches.length ? (
        <p className="u-p-3 u-text-yellow-400 u-text-center u-font-bold">
          No matches data found
        </p>
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
    </div>
  );
};

export default MatchTiles;
