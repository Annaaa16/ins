import type { NextPage } from 'next';

// import { withRoute } from '~/hocs';

import Header from '~/components/Header';
import HomeFeed from '~/features/home/HomeFeed';
import HomeWidget from '~/features/home/HomeWidget';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className='grid grid-cols-3 w-container-w mx-auto space-header'>
        <HomeFeed />
        <HomeWidget />
      </main>
    </>
  );
};

export default Home;

// export const getServerSideProps = withRoute({ isProtected: true })();
