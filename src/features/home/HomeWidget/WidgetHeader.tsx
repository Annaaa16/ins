import clsx from 'clsx';

import { useAuthSelector } from '~/redux/selectors';
import { getNameInMail } from '~/helpers/format';

import avatar from '~/assets/avatar.png';

const WidgetHeader = () => {
  const { currentUser } = useAuthSelector();

  return (
    <div className='flex items-center text-sm-1'>
      <img
        className={clsx('w-14 h-14 rounded-full mr-3', 'cursor-pointer')}
        src={currentUser?.avatar ?? avatar.src}
        alt='Avatar'
      />
      <div>
        <div className={clsx('font-medium', 'cursor-pointer')}>
          {getNameInMail(currentUser?.email)}
        </div>
        <div className={clsx('mt-0.5', 'text-base-gray')}>{currentUser?.username}</div>
      </div>
      <button className={clsx('btn ml-auto', 'text-primary')}>Switch</button>
    </div>
  );
};

export default WidgetHeader;
