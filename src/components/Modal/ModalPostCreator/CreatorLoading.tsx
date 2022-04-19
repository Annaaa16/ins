import clsx from 'clsx';
import Spinner from '~/components/Spinner';

const CreatorLoading = () => {
  return (
    <div
      className={clsx(
        'flex flex-col m-auto rounded-lg w-[515px] h-[613px] max-h-full overflow-hidden',
        'bg-white',
      )}
    >
      <div className={clsx('sticky top-0', 'flex-center text-sm py-3 border-b border-line')}>
        <span className='font-medium text-lg'>Sharing</span>
      </div>
      <div className='flex-center flex-grow'>
        <Spinner className='w-20' />
      </div>
    </div>
  );
};

export default CreatorLoading;
