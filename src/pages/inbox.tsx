import clsx from 'clsx';

import { withRoute } from '~/hocs';

import Header from '../components/Header';
import InboxSidebar from '~/features/inbox/InboxSidebar';
import InboxMessage from '~/features/inbox/InboxMessage';

const Inbox = () => {
  return (
    <>
      <Header />
      <main className='inbox-height mt-header-h py-4'>
        <section
          className={clsx(
            'flex border max-w-full h-full border-line mx-auto w-container-w',
            'bg-white',
          )}
        >
          <aside className='w-full lg:w-2/5 flex flex-col border-r h-full border-line'>
            <InboxSidebar />
          </aside>

          <div className='flex flex-col w-full lg:w-3/5'>
            <InboxMessage />
          </div>
        </section>
      </main>
    </>
  );
};

export default Inbox;

export const getServerSideProps = withRoute({ isProtected: true })();
