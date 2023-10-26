import Dashboard from './dashboard';
import { MatchResponseData } from '@/interfaces/response.interface';
import { Match, parseMatch } from '@/interfaces/match.interface';

async function fetchAllMatches(): Promise<Match[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BET_BETTER_API}/matches`, {
    next: { revalidate: 3600 },
  });

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
    <main className="u-p-5 u-min-h-screen sm:u-py-7 sm:u-px-9">
      <h1 className="u-mb-5 u-text-3xl u-text-yellow-400 u-font-bold sm:u-text-5xl sm:u-text-center">
        BetBetter
      </h1>

      <Dashboard matches={matches} />
    </main>
  );
};

export default Home;
