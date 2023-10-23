import Image from 'next/image';
import { MatchResponse } from '@/interfaces/match.interface';
import DateInfo from './date-info';
import OddsBlock from './odds-block';

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
  const handleToggleClick = () => onToggleMatchTile(match.id);

  return (
    <div className="u-py-3 u-px-7 u-bg-green-50 u-rounded-xl u-border u-text-slate-900 u-shadow">
      <div>
        <DateInfo startTime={match.startTime} lastUpdated={match.lastUpdated} />

        <div className="u-flex u-items-center u-justify-between u-gap-3">
          <div className="u-flex-1 u-flex u-items-stretch u-justify-between u-gap-3">
            <OddsBlock
              betValue="Home"
              team={match.home}
              oddsValue={match.odds[match.odds.length - 1].home}
            />

            <OddsBlock
              betValue="Away"
              team={match.away}
              oddsValue={match.odds[match.odds.length - 1].away}
            />

            <OddsBlock
              betValue="Draw"
              oddsValue={match.odds[match.odds.length - 1].draw}
            />
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
        className={`u-h-full u-overflow-hidden u-transition-[max-height] ${
          isExpanded ? 'u-max-h-16' : 'u-max-h-0'
        }`}
      >
        <div className="u-py-3 u-px-7 u-bg-gray-800 u-text-white">
          Expanded content
        </div>
      </div>
    </div>
  );
};

export default MatchTile;
