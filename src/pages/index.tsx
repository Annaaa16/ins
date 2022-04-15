import type { GetServerSideProps, NextPage } from 'next';

// import Header from '~/components/Header';
// import HomeFeed from '~/features/home/HomeFeed';
// import HomeWidget from '~/features/home/HomeWidget';
import { useStoreDispatch } from '~/redux/store';
import { useCounterSelector } from '~/redux/selectors';
import { counterActions } from '~/redux/slices/counterSlice';
import { wrapper } from '~/redux/store';

const Home: NextPage = () => {
  const dispatch = useStoreDispatch();

  const { value } = useCounterSelector();

  return (
    <div>
      <h2>COUNTER</h2>
      <h2>{value}</h2>
      <button onClick={() => dispatch(counterActions.increaseByMount(10))}>Increment</button>
    </div>
    // <>
    //   <Header />
    //   <main className='grid grid-cols-3 w-container-w mx-auto space-header'>
    //     <HomeFeed />
    //     <HomeWidget />
    //   </main>
    // </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      dispatch(counterActions.increase());

      return {
        props: {},
      };
    },
);
