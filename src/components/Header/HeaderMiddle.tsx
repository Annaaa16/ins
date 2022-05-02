import { useRef, useState } from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { UserFragment, useSearchUserMutation } from '~/types/generated';
import { getNameInMail } from '~/helpers/format';
import { useClickOutside, useDebounce } from '~/hooks';

import Skeleton from '../Skeleton';
import SpinnerRing from '../Spinner/SpinnerRing';

import avatar from '~/assets/avatar.png';
import SpinnerLogo from '../Spinner/SpinnerLogo';

const HeaderMiddle = () => {
  const [searchedUsers, setSearchedUsers] = useState<UserFragment[]>([]);
  const [isOpenSearchList, setIsOpenSearchList] = useState<boolean>(false);

  const searchListRef = useRef<HTMLUListElement>(null);

  const [searchUser] = useSearchUserMutation();
  const [debouncing, handleDebounce] = useDebounce();

  const handleSearchUser = async (value: string) => {
    setIsOpenSearchList(true);

    const response = await searchUser({
      variables: {
        query: value,
        limit: LIMITS.SEARCH_USER,
      },
    });

    const data = response.data?.searchUser;

    if (data?.success) setSearchedUsers(data.users!);
  };

  const handleInputChange = handleDebounce(handleSearchUser, () => setSearchedUsers([]));

  useClickOutside(searchListRef, () => {
    setIsOpenSearchList(false);
    setSearchedUsers([]);
  });

  return (
    <div className={clsx('relative', 'ml-auto w-[268px] h-full')}>
      <div className={clsx('flex items-center px-4 py-1 h-full rounded-md', 'bg-gray-100')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={clsx('mr-3', 'text-zinc-400')} />
        <input
          onChange={handleInputChange}
          className={clsx(
            'w-full h-full font-medium text-sm',
            'placeholder:font-normal placeholder:text-base-gray',
          )}
          placeholder='Search'
        />
        {debouncing && <SpinnerRing className='ml-2' />}
      </div>

      {isOpenSearchList && (
        <div
          className={clsx(
            'abs-center-x top-[calc(100%+10px)]',
            'w-[140%] h-96 max-h-96 shadow-[0_1px_5px_1px_rgba(0,0,0,0.0975)] rounded-md py-2 overflow-y-auto',
            'bg-white',
          )}
        >
          {debouncing && searchedUsers.length === 0 ? (
            <div className='flex-center h-full'>
              <SpinnerLogo className='w-14 h-14' />
            </div>
          ) : (
            <ul ref={searchListRef} className='w-full h-full'>
              {searchedUsers.map((user) => (
                <li
                  key={user._id}
                  className={clsx(
                    'flex items-center w-full px-4 py-2',
                    'cursor-pointer',
                    'hover:bg-gray-50',
                  )}
                >
                  <Skeleton
                    src={user.avatar ?? avatar.src}
                    className='w-10 h-10 mr-2.5'
                    objectFit='cover'
                    rounded
                  />
                  <div className='min-w-0 text-sm-1'>
                    <div className='font-medium truncate'>{getNameInMail(user.email)}</div>
                    <div className={clsx('mt-0.5 w-full truncate', 'text-base-gray')}>
                      {user.username}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderMiddle;
