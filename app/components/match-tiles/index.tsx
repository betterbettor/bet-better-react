import { Suspense } from 'react';
import MatchTile from './match-tile';
import Loading from './loading';
import { MatchResponse } from '@/interfaces/match.interface';

interface MatchTilesProps {
  matches?: MatchResponse[];
}

const MatchTiles = ({ matches = [] }: MatchTilesProps) => {
  return (
    <div className="u-py-5 u-px-7 u-bg-green-100 u-rounded-xl u-flex u-flex-col u-gap-5">
      <Suspense fallback={<Loading />}>
        {!matches.length
          ? 'No matches data found'
          : matches.map((match) => <MatchTile key={match.id} match={match} />)}
      </Suspense>
    </div>
  );
};

export default MatchTiles;
