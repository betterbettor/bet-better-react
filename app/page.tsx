import { Suspense } from 'react';
import Loading from './loading';

async function checkServerHealth() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BET_BETTER_API}/matches`);

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

const Home = async () => {
  const data = await checkServerHealth();
  return (
    <main>
      <h1>
        <span>Matches Response: </span>
        <Suspense fallback={<Loading />}>
          <span>{JSON.stringify(data)}</span>
        </Suspense>
      </h1>
    </main>
  );
};

export default Home;
