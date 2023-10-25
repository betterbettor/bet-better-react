import { MatchResponse } from './match.interface';

export interface ResponseData {
  code: number;
}

export interface MatchResponseData extends ResponseData {
  matches: MatchResponse[];
}
