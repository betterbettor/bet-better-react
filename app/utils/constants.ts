import { LineItem } from '@/interfaces/ui.type';

export const twentyFourHoursInMilliseconds = 24 * 3600 * 1000;
export const sevenDaysInMilliseconds = 7 * twentyFourHoursInMilliseconds;

export const leagueName = 'Premier League';
export const leagueLogoUrl =
  'https://media-4.api-sports.io/football/leagues/39.png';

export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
};

export const numberFormatOptions: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const lineItems: LineItem[] = [
  { key: 'home', label: 'Home', color: '#22C55E' },
  { key: 'draw', label: 'Draw', color: '#CA8A04' },
  { key: 'away', label: 'Away', color: '#E879F9' },
];
