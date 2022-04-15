import clsx from 'clsx';
import avatar from '~/assets/avatar.png';

const WidgetHeader = () => {
  return (
    <div className='flex items-center text-sm-1'>
      <img
        className={clsx('w-14 h-14 rounded-full mr-3', 'cursor-pointer')}
        src={avatar.src}
        alt='Avatar'
      />
      <div>
        <div className={clsx('font-medium', 'cursor-pointer')}>minhhunghuynh1106</div>
        <div className={clsx('mt-0.5', 'text-base-gray')}>Minh Hung</div>
      </div>
      <button className={clsx('btn ml-auto', 'text-primary')}>Switch</button>
    </div>
  );
};

export default WidgetHeader;
