'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import MatchTiles from './match-tiles';
import Loading from '../loading';
import { Match } from '@/interfaces/match.interface';
import { ExpandedMap, ExpandedMapStates } from '@/interfaces/ui.type';
import { leagueLogoUrl, leagueName } from '../utils/constants';

const DatePicker = dynamic(() => import('./date-picker'), {
  ssr: false,
  loading: () => <Loading />,
});

interface DashboardProps {
  matches: Match[];
}

const Dashboard = ({ matches }: DashboardProps) => {
  const expandedMapStates: ExpandedMapStates = useMemo(() => {
    const states: ExpandedMapStates = {
      ALL_EXPANDED: new Map(),
      ALL_COLLAPSED: new Map(),
    };
    matches.forEach((match) => {
      states.ALL_EXPANDED.set(match.id, true);
      states.ALL_COLLAPSED.set(match.id, false);
    });

    return states;
  }, [matches]);

  const [expandedMap, setExpandedMap] = useState(
    expandedMapStates.ALL_COLLAPSED,
  );

  const [startDate, setStartDate] = useState<Date>(new Date());

  const hasAllTilesExpanded = useMemo(() => {
    return (
      !!matches.length && matches.every((match) => expandedMap.get(match.id))
    );
  }, [expandedMap, matches]);

  const matchesFilteredByDate = useMemo(() => {
    return matches.filter(
      (match) => match.startTime.toDateString() === startDate.toDateString(),
    );
  }, [matches, startDate]);

  const handleToggleAll = () => {
    setExpandedMap(
      hasAllTilesExpanded
        ? expandedMapStates.ALL_COLLAPSED
        : expandedMapStates.ALL_EXPANDED,
    );
  };

  const handleToggleMatchTile = (matchId: number) => {
    setExpandedMap((previousMap) => {
      const newMap: ExpandedMap = new Map(previousMap);
      return newMap.set(matchId, !previousMap.get(matchId));
    });
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) setStartDate(date);
  };

  return (
    <div>
      <div className="u-mb-5 u-flex u-flex-col u-gap-3 u-items-stretch sm:u-grid sm:u-grid-cols-3 sm:u-items-center sm:u-gap-2">
        <div className="u-p-1 u-w-full u-h-full u-bg-green-100 u-flex u-flex-row u-items-center u-justify-center u-gap-2 u-rounded-3xl sm:u-max-w-[208px] sm:u-gap-0">
          <Image src={leagueLogoUrl} alt={leagueName} width={70} height={70} />{' '}
          <div className="u-font-bold u-text-3xl u-text-[#3D195B]">
            {leagueName}
          </div>
        </div>

        <DatePicker
          className="sm:u-m-auto sm:u-w-full sm:u-max-w-[256px]"
          startDate={startDate}
          onChange={handleChangeDate}
        />

        <button
          className={`u-block u-py-2 u-px-5 u-font-bold u-rounded u-shadow-lg u-transition-shadow hover:u-shadow-xl sm:u-ml-auto sm:u-py-3 sm:u-px-7 sm:u-w-40 ${
            hasAllTilesExpanded
              ? 'u-bg-green-600 u-text-green-100'
              : 'u-bg-green-300 u-text-green-950'
          }`}
          onClick={handleToggleAll}
          disabled={!matches.length}
        >
          {hasAllTilesExpanded ? 'Collapse' : 'Expand'} All
        </button>
      </div>

      <MatchTiles
        matches={matchesFilteredByDate}
        expandedMap={expandedMap}
        onToggleMatchTile={handleToggleMatchTile}
      />
    </div>
  );
};

export default Dashboard;
