export type BetValue = 'Home' | 'Away' | 'Draw';

export interface OddsValuesData {
  home: number;
  away: number;
  draw: number;
  timestamp: number; // date transformation handled by frontend
}

export type OddsValues = {
  home: number;
  away: number;
  draw: number;
  timestamp: Date;
};

export function parseOddsValues(oddsValuesData: OddsValuesData): OddsValues {
  return {
    ...oddsValuesData,
    timestamp: new Date(oddsValuesData.timestamp),
  };
}

interface Odds extends OddsValuesData {
  matchId: number;
  bookMakerId: number;
  bookMakerName: string;
}

export default Odds;
