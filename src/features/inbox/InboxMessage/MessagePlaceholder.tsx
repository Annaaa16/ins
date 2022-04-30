import clsx from 'clsx';

import IconDirect from '~/components/Icon/IconDirect';

const MessagePlaceholder = () => {
  return (
    <div className='flex-center flex-col w-full h-full'>
      <IconDirect />
      <p className='mt-4 text-sm'>Send private photos and messages to a friend or group.</p>
      <button className={clsx('btn mt-4 text-sm px-4 py-2', 'text-white bg-primary')}>
        Send Message
      </button>
    </div>
  );
};

export default MessagePlaceholder;
