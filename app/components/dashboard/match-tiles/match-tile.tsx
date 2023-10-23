import Image from 'next/image';
import { MatchResponse } from '@/interfaces/match.interface';

interface MatchTileProps {
  match: MatchResponse;
  isExpanded: boolean;
  onToggleMatchTile: (matchId: number) => void;
}
const MatchTile = ({
  match,
  isExpanded = false,
  onToggleMatchTile,
}: MatchTileProps) => {
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  const handleToggleClick = () => onToggleMatchTile(match.id);

  return (
    <div className="u-py-3 u-px-7 u-bg-green-50 u-rounded-xl u-border u-text-slate-900 u-shadow">
      <div>
        <p className="u-text-xs u-flex u-justify-between">
          <span>
            Start Date:{' '}
            {new Date(match.startTime).toLocaleString(
              undefined,
              dateTimeFormatOptions,
            )}
          </span>
          <span>
            Last updated:{' '}
            {new Date(match.lastUpdated).toLocaleString(
              undefined,
              dateTimeFormatOptions,
            )}
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

          <button className="u-w-5 u-h-5" onClick={handleToggleClick}>
            <p
              className={`u-text-green-600 u-font-bold u-transition-transform ${
                isExpanded ? 'u-rotate-180' : 'u-rotate-0'
              }`}
            >
              V
            </p>
          </button>
        </div>
      </div>

      <div
        className={`u-h-full u-bg-gray-800 u-text-white u-overflow-hidden u-transition-[max-height] ${
          isExpanded ? 'u-max-h-16' : 'u-max-h-0'
        }`}
      >
        <p className="u-py-3 u-px-7">Expanded content</p>
      </div>
    </div>
  );
};

export default MatchTile;
