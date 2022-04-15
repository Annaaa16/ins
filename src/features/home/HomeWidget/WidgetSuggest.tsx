import clsx from 'clsx';

import avatar from '~/assets/avatar.png';

const WidgetSuggest = () => {
  return (
    <div className='text-sm-1 mt-7'>
      <div className='flex-between'>
        <span className={clsx('font-medium', 'text-base-gray')}>Suggestions For You</span>
        <button className='font-bold'>See All</button>
      </div>
      <div className='space-y-4 mt-3'>
        <div className='flex items-center text-sm-1'>
          <img className='w-8 h-8 rounded-full mr-3' src={avatar.src} alt='Avatar' />
          <div>
            <div className={clsx('font-medium', 'hover:underline', 'cursor-pointer')}>
              minhhunghuynh1106
            </div>
            <div className={clsx('mt-1', 'text-base-gray')}>Popular</div>
          </div>
          <button className={clsx('btn ml-auto', 'text-primary')}>Switch</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSuggest;
