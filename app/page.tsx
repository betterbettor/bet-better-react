import { Suspense } from 'react';
import Loading from './loading';
import Image from 'next/image';
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

      <div className="u-py-5 u-px-7 u-bg-green-100 u-rounded-xl u-flex u-flex-col u-gap-5">
        <Suspense fallback={<Loading />}>
          {!matches.length
            ? 'No matches data found'
            : matches.map((match) => (
                <div
                  key={match.id}
                  className="u-py-3 u-px-7 u-bg-green-50 u-rounded-xl u-border u-text-slate-900 u-shadow"
                >
                  <p className="u-text-xs u-flex u-justify-between">
                    <span>
                      Start Date:{' '}
                      {new Date(match.startTime).toLocaleDateString()}
                      {new Date(match.startTime).toLocaleTimeString()}
                    </span>
                    <span>
                      Last updated:{' '}
                      {new Date(match.lastUpdated).toLocaleDateString()}
                      {new Date(match.lastUpdated).toLocaleTimeString()}
                    </span>
                  </p>

                  <div className="u-flex u-items-center u-justify-between u-gap-3">
                    <div className="u-flex-1 u-flex u-items-stretch u-justify-between u-gap-3">
                      <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
                        <div className="u-text-sm u-text-center u-font-bold">
                          Home
                        </div>

                        <div className="u-flex u-items-center u-gap-3">
                          <Image
                            src={match.home.logo}
                            alt={match.home.name}
                            width={30}
                            height={30}
                          />
                          <h2 className="u-text-lg u-font-bold">
                            {match.home.name}
                          </h2>
                        </div>

                        <div className="u-text-3xl u-text-center">
                          {match.odds[match.odds.length - 1].home}
                        </div>
                      </div>

                      <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
                        <div className="u-text-sm u-text-center u-font-bold">
                          Away
                        </div>

                        <div className="u-flex u-items-center u-gap-3">
                          <Image
                            src={match.away.logo}
                            alt={match.away.name}
                            width={30}
                            height={30}
                          />
                          <h2 className="u-text-lg u-font-bold">
                            {match.away.name}
                          </h2>
                        </div>

                        <div className="u-text-3xl u-text-center">
                          {match.odds[match.odds.length - 1].away}
                        </div>
                      </div>

                      <div className="u-flex-1 u-flex u-flex-col u-justify-between u-gap-3">
                        <div className="u-text-sm u-text-center u-font-bold">
                          Draw
                        </div>

                        <div className="u-text-3xl u-text-center">
                          {match.odds[match.odds.length - 1].draw}
                        </div>
                      </div>
                    </div>

                    <button className="u-w-5 u-h-5">V</button>
                  </div>
                </div>
              ))}
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
