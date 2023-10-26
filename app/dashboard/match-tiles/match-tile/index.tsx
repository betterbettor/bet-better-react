import dynamic from 'next/dynamic';
import DateInfo from './date-info';
import OddsBlock from './odds-block';
import ExpandableSection from './expandable-section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import Loading from '@/app/loading';
import { Match } from '@/interfaces/match.interface';
import { BetValue } from '@/interfaces/odds.interface';
import { lineItems } from '@/app/utils/constants';

const MultiLineChart = dynamic(() => import('@/app/chart/multiline-chart'), {
  ssr: false,
  loading: () => <Loading />,
});

interface MatchTileProps {
  match: Match;
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
    <div className="u-p-3 u-bg-green-100 u-rounded-xl u-border u-text-slate-900 u-shadow sm:u-px-5">
      <div>
        <DateInfo
          className="u-mb-3"
          startTime={match.startTime}
          lastUpdated={match.lastUpdated}
        />

        <div className="u-flex u-flex-col u-justify-between u-items-stretch sm:u-flex-row">
          <div className="u-flex-1 u-flex u-flex-col u-items-stretch u-justify-between u-flex-wrap u-gap-2 sm:u-flex-row sm:u-gap-3">
            {lineItems.map((lineItem, idx) => (
              <div key={lineItem.key} className="u-contents">
                {!!idx && (
                  <div className="u-hidden u-border u-border-green-300 sm:u-inline" />
                )}

                <OddsBlock
                  betValue={lineItem.label as BetValue}
                  oddsValue={
                    match.odds[match.odds.length - 1][
                      lineItem.key as Lowercase<BetValue>
                    ]
                  }
                  team={
                    match[lineItem.key as Lowercase<BetValue> & keyof Match]
                  }
                  color={lineItem.color}
                />
              </div>
            ))}
          </div>

          <button className="u-px-2" onClick={handleToggleClick}>
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
        <div className="u-p-4 u-bg-gray-800 u-text-white u-rounded u-overflow-auto sm:u-mt-3 sm:u-p-5 md:u-p-10">
          <MultiLineChart
            data={match.odds}
            xKey="timestamp"
            lineItems={lineItems}
            chartKey={match.id.toString()}
          />
        </div>
      </ExpandableSection>
    </div>
  );
};

export default MatchTile;
