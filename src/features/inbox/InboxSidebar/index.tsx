import clsx from 'clsx';

import IconNewMessage from '~/components/Icon/IconNewMessage';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

const InboxSidebar = () => {
  return (
    <>
      <div className={clsx('relative', 'flex-shrink-0 h-header-h border-b border-line')}>
        <div className='flex-center h-full w-full font-medium text-sm lg:text-base'>
          minhhunghuynh1106
        </div>
        <IconNewMessage className={clsx('abs-center-y right-5', 'cursor-pointer')} />
      </div>

      <div className='overflow-y-auto'>
        <div className={clsx('flex items-center px-4 py-2.5', 'bg-gray-100')}>
          <Skeleton className='mr-3 w-12 h-12' objectFit='cover' rounded src={avatar.src} />
          <div className='min-w-0 text-sm-1 lg:text-sm'>
            <div>igdev</div>
            <div className={clsx('flex mt-0.5', 'text-base-gray')}>
              <div className='mr-1.5 truncate'>hello worldworldworldworldworldworldworld</div>
              <div className='flex-1'>41s</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InboxSidebar;
