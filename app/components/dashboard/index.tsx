'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import MatchTiles from '../match-tiles';
import SearchBar from './search-bar';
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

  const [expandedMap, setExpandedMap] = useState(
    expandedMapStates.ALL_COLLAPSED,
  );

  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

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

  return (
    <div>
      <SearchBar onChange={handleInputChange} onSubmit={handleSubmit} />

      <button
        className="u-block u-ml-auto u-mb-5 u-py-3 u-px-7 u-w-40 u-bg-green-900 u-rounded"
        onClick={handleToggleAll}
      >
        {hasAllTilesExpanded ? 'Collapse' : 'Expand'} All
      </button>

      <MatchTiles
        matches={filteredMatches}
        expandedMap={expandedMap}
        onToggleMatchTile={handleToggleMatchTile}
      />
    </div>
  );
};

export default Dashboard;
