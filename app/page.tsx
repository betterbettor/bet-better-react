import Dashboard from './dashboard';
import { MatchResponseData } from '@/interfaces/response.interface';
import { Match, parseMatch } from '@/interfaces/match.interface';

async function fetchAllMatches(): Promise<Match[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BET_BETTER_API}/matches`);

  if (!res.ok) {
    console.error('Failed to fetch data');
    return [];
  }

  return res
    .json()
    .then(({ matches }: MatchResponseData) => matches.map(parseMatch));
}

const Home = async () => {
  const matches = await fetchAllMatches();

  return (
    <main className="u-p-5 sm:u-py-7 sm:u-px-9">
      <h1 className="u-text-xl">BetBetter</h1>

      <Dashboard matches={matches} />
    </main>
  );
};

export default Home;
