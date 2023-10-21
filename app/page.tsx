import MatchTiles from '@/app/components/match-tiles';
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

      <div className="u-py-5">
        <input
          type="text"
          className="u-py-3 u-px-7 u-w-full u-bg-green-300 u-rounded-full"
          placeholder="Search for a team"
        />
      </div>

      <button className="u-block u-ml-auto u-mb-5 u-py-3 u-px-7 u-bg-green-900 u-rounded">
        Expand All
      </button>

      <MatchTiles matches={matches} />
    </main>
  );
};

export default Home;
