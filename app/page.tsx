import Dashboard from './dashboard';
import MatchResponseData from '@/interfaces/response.interface';

async function fetchAllMatches(): Promise<MatchResponseData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BET_BETTER_API}/matches`);

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

const Home = async () => {
  const { matches } = await fetchAllMatches();

  return (
    <main className="u-py-7 u-px-9">
      <h1 className="u-text-xl">BetBetter</h1>

      <Dashboard matches={matches} />
    </main>
  );
};

export default Home;
