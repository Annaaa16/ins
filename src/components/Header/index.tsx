import { useRouter } from 'next/router';

import clsx from 'clsx';

import { ROUTES } from '~/constants';

import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

// images
import { logo } from '~/assets/images';

const Header = () => {
  const router = useRouter();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40',
        'border-b border-1 border-line',
        'bg-white',
      )}
    >
      <div className={clsx('grid grid-cols-3 items-center mx-auto w-container-w h-header-h py-3')}>
        <img
          onClick={() => router.push(ROUTES.HOME)}
          className={clsx('h-8', 'cursor-pointer')}
          src={logo.src}
          alt='Logo'
          draggable={false}
        />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
