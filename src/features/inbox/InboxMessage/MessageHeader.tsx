import clsx from 'clsx';

import IconThreadDetail from '~/components/Icon/IconThreadDetail';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

const MessageHeader = () => {
  return (
    <div className={clsx('flex-between flex-shrink-0 h-header-h px-4 border-b border-line')}>
      <div className='flex items-center'>
        <Skeleton className='mr-2 w-8 h-8' objectFit='cover' rounded src={avatar.src} />
        <span className='font-medium text-sm lg:text-base'>minhhunghuynh1106</span>
      </div>
      <IconThreadDetail className={clsx('cursor-pointer')} />
    </div>
  );
};

export default MessageHeader;
