import League from './league.interface';
import { OddsValues, OddsValuesData, parseOddsValues } from './odds.interface';
import Team from './team.interface';

interface MatchData {
  id: number;
  startTime: number;
  league: League;
  home: Team;
  away: Team;
  lastUpdated: number;
}

export interface MatchResponse extends MatchData {
  bookMakerId?: number;
  bookMakerName?: string;
  odds: OddsValuesData[];
}

export type Match = {
  id: number;
  startTime: Date;
  league: League;
  home: Team;
  away: Team;
  lastUpdated: Date;
  bookMakerId?: number;
  bookMakerName?: string;
  odds: OddsValues[];
};

export function parseMatch(matchResponse: MatchResponse): Match {
  return {
    ...matchResponse,
    startTime: new Date(matchResponse.startTime),
    lastUpdated: new Date(matchResponse.lastUpdated),
    odds: matchResponse.odds.map(parseOddsValues),
  };
}
