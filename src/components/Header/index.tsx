import clsx from 'clsx';

import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

// images
import { logo } from '~/assets/images';

const Header = () => {
  return (
    <header
      className={clsx('fixed top-0 left-0 right-0', 'border-b border-1 border-line', 'bg-white')}
    >
      <div className={clsx('grid grid-cols-3 items-center mx-auto w-container-w h-header-h py-3')}>
        <img className='h-8' src={logo.src} alt='Logo' draggable={false} />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
