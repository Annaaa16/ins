import type { NextPage } from 'next';
import DialogPostCreator from '~/components/Dialog/DialogPostCreator';

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
      <DialogPostCreator />
    </>
  );
};

export default Home;
