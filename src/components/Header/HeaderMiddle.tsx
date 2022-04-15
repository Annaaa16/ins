import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

const HeaderMiddle = () => {
  return (
    <div
      className={clsx(
        'flex items-center ml-auto w-[268px] px-4 py-1 rounded-md h-full',
        'bg-gray-100',
      )}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className={clsx('mr-3', 'text-zinc-400')} />
      <input
        className={clsx(
          'w-full h-full font-medium text-sm',
          'placeholder:font-normal placeholder:text-base-gray',
        )}
        placeholder='Search'
      />
    </div>
  );
};

export default HeaderMiddle;
