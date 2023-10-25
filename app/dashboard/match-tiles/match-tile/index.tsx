import DateInfo from './date-info';
import OddsBlock from './odds-block';
import ExpandableSection from './expandable-section';
import MultiLineChart from '@/app/chart/multiline-chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
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
  const handleToggleClick = () => onToggleMatchTile(match.id);

  return (
    <div className="u-p-3 u-bg-green-50 u-rounded-xl u-border u-text-slate-900 u-shadow sm:u-py-5 sm:u-px-7">
      <div>
        <DateInfo startTime={match.startTime} lastUpdated={match.lastUpdated} />

        <div className="u-flex u-items-center u-justify-between u-gap-3">
          <div className="u-flex-1 u-flex u-items-stretch u-justify-between u-flex-wrap u-gap-3">
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
            <FontAwesomeIcon
              className={`u-text-green-600 u-font-bold u-transition-transform ${
                isExpanded ? 'u-rotate-180' : 'u-rotate-0'
              }`}
              icon={faCaretDown}
              size="2xl"
            />
          </button>
        </div>
      </div>

      <ExpandableSection isExpanded={isExpanded}>
        <div className="u-p-4 u-bg-gray-800 u-text-white u-overflow-auto sm:u-p-5 md:u-p-10">
          <MultiLineChart data={match.odds} />
        </div>
      </ExpandableSection>
    </div>
  );
};

export default MatchTile;
