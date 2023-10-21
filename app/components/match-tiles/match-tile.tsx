import Image from 'next/image';
import { MatchResponse } from '@/interfaces/match.interface';

interface MatchTileProps {
  match: MatchResponse;
}
const MatchTile = ({ match }: MatchTileProps) => {
  return (
    <div className="u-py-3 u-px-7 u-bg-green-50 u-rounded-xl u-border u-text-slate-900 u-shadow">
      <p className="u-text-xs u-flex u-justify-between">
        <span>
          Start Date: {new Date(match.startTime).toLocaleDateString()}
          {new Date(match.startTime).toLocaleTimeString()}
        </span>
        <span>
          Last updated: {new Date(match.lastUpdated).toLocaleDateString()}
          {new Date(match.lastUpdated).toLocaleTimeString()}
        </span>
      </p>

      <div className="u-flex u-items-center u-justify-between u-gap-3">
        <div className="u-flex-1 u-flex u-items-stretch u-justify-between u-gap-3">
          <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
            <div className="u-text-sm u-text-center u-font-bold">Home</div>

            <div className="u-flex u-items-center u-gap-3">
              <Image
                src={match.home.logo}
                alt={match.home.name}
                width={30}
                height={30}
              />
              <h2 className="u-text-lg u-font-bold">{match.home.name}</h2>
            </div>

            <div className="u-text-3xl u-text-center">
              {match.odds[match.odds.length - 1].home}
            </div>
          </div>

          <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
            <div className="u-text-sm u-text-center u-font-bold">Away</div>

            <div className="u-flex u-items-center u-gap-3">
              <Image
                src={match.away.logo}
                alt={match.away.name}
                width={30}
                height={30}
              />
              <h2 className="u-text-lg u-font-bold">{match.away.name}</h2>
            </div>

            <div className="u-text-3xl u-text-center">
              {match.odds[match.odds.length - 1].away}
            </div>
          </div>

          <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
            <div className="u-text-sm u-text-center u-font-bold">Draw</div>

            <div className="u-text-3xl u-text-center">
              {match.odds[match.odds.length - 1].draw}
            </div>
          </div>
        </div>

        <button className="u-w-5 u-h-5">V</button>
      </div>
    </div>
  );
};

export default MatchTile;
