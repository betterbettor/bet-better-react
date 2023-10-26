import dynamic from 'next/dynamic';
import DateInfo from './date-info';
import OddsBlock from './odds-block';
import ExpandableSection from './expandable-section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { Match } from '@/interfaces/match.interface';
import { OddsValues } from '@/interfaces/odds.interface';
import { LineItem } from '@/interfaces/ui.type';

const MultiLineChart = dynamic(() => import('@/app/chart/multiline-chart'), {
  ssr: false,
});

interface MatchTileProps {
  match: Match;
  isExpanded: boolean;
  onToggleMatchTile: (matchId: number) => void;
}

const lineItems: LineItem[] = [
  { key: 'home', label: 'Home', color: 'green' },
  { key: 'away', label: 'Away', color: 'red' },
  { key: 'draw', label: 'Draw', color: 'gold' },
];

const DUMMY_ODDS: OddsValues[] = [
  {
    home: 1.4,
    away: 6.5,
    draw: 5.5,
    timestamp: new Date('2023-10-21T00:14:58.000Z'),
  },
  {
    home: 1.73,
    away: 5.25,
    draw: 3.6,
    timestamp: new Date('2023-10-21T03:17:58.000Z'),
  },
  {
    home: 1.8,
    away: 4.5,
    draw: 3.6,
    timestamp: new Date('2023-10-21T06:17:58.000Z'),
  },
  {
    home: 2.3,
    away: 3.2,
    draw: 3.4,
    timestamp: new Date('2023-10-21T09:17:58.000Z'),
  },
  {
    home: 1.36,
    away: 7,
    draw: 5.75,
    timestamp: new Date('2023-10-21T12:17:58.000Z'),
  },
  {
    home: 1.44,
    away: 7.5,
    draw: 4.5,
    timestamp: new Date('2023-10-21T15:17:58.000Z'),
  },
  {
    home: 3.3,
    away: 2.3,
    draw: 3.2,
    timestamp: new Date('2023-10-21T18:00:54.000Z'),
  },
  {
    home: 7.5,
    away: 1.36,
    draw: 5.75,
    timestamp: new Date('2023-10-21T21:13:29.000Z'),
  },
  {
    home: 1.8,
    away: 4.33,
    draw: 3.75,
    timestamp: new Date('2023-10-22T00:09:16.000Z'),
  },
  {
    home: 1.5,
    away: 5.75,
    draw: 4.75,
    timestamp: new Date('2023-10-22T03:03:04.000Z'),
  },
];
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
        <div className="u-p-4 u-bg-gray-800 u-text-white u-rounded u-overflow-auto sm:u-p-5 md:u-p-10">
          {/* <MultiLineChart data={match.odds} xKey="timestamp" lineItems={lineItems} /> */}
          <MultiLineChart
            data={DUMMY_ODDS}
            xKey="timestamp"
            lineItems={lineItems}
          />
        </div>
      </ExpandableSection>
    </div>
  );
};

export default MatchTile;
