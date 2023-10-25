'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import MatchTiles from './match-tiles';
import SearchBar from './search-bar';
import DatePicker from './date-picker';
import { MatchResponse } from '@/interfaces/match.interface';
import { ExpandedMap, ExpandedMapStates } from '@/interfaces/ui.type';

interface DashboardProps {
  matches: MatchResponse[];
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

  const allTeamNames = useMemo(() => {
    const allTeamNamesSet = matches.reduce((teamsSet, match) => {
      teamsSet.add(match.home.name);
      teamsSet.add(match.away.name);
      return teamsSet;
    }, new Set<string>());

    return Array.from(allTeamNamesSet).sort();
  }, [matches]);

  const [expandedMap, setExpandedMap] = useState(
    expandedMapStates.ALL_COLLAPSED,
  );

  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());

  const suggestedTeamNames = useMemo(() => {
    return allTeamNames.filter((teamName) =>
      teamName.toLowerCase().includes(keyword.toLowerCase().trim()),
    );
  }, [allTeamNames, keyword]);

  const hasAllTilesExpanded = useMemo(() => {
    return matches.every((match) => expandedMap.get(match.id));
  }, [expandedMap, matches]);

  const filteredMatches = useMemo(() => {
    return matches.filter(
      (match) =>
        match.home.name.toLowerCase().includes(query) ||
        match.away.name.toLowerCase().includes(query),
    );
  }, [matches, query]);

  const matchesFilteredByDate = useMemo(() => {
    return matches.filter(
      (match) =>
        new Date(match.startTime).toDateString() === startDate.toDateString(),
    );
  }, [matches, startDate]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSuggestionClicked = (suggestion: string) => () =>
    setKeyword(suggestion);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(keyword.toLowerCase().trim());
  };

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
      <SearchBar
        value={keyword}
        suggestions={suggestedTeamNames}
        onChange={handleInputChange}
        onSuggestionClicked={handleSuggestionClicked}
        onSubmit={handleSubmit}
      />

      <div className="u-grid u-gap-3 sm:u-grid-cols-[1fr_auto_1fr] u-mb-5 u-items-center u-justify-items-center u-basis-full">
        <div>League</div>
        <div>
          <DatePicker startDate={startDate} onChange={handleChangeDate} />
        </div>
        <button
          className={`u-block sm:u-ml-auto u-py-3 u-px-7 u-w-40 ${
            hasAllTilesExpanded
              ? 'u-bg-green-600'
              : 'u-bg-green-300 u-text-black'
          } u-rounded`}
          onClick={handleToggleAll}
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
