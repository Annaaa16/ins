import clsx from 'clsx';

import IconCompass from '../Icon/IconCompass';
import IconCreate from '../Icon/IconCreate';
import IconHeart from '../Icon/IconHeart';
import IconHome from '../Icon/IconHome';
import IconMessenger from '../Icon/IconMessenger';

const HeaderRight = () => {
  return (
    <div className='flex justify-end gap-x-5'>
      <IconHome className={clsx('cursor-pointer')} active />
      <IconMessenger className={clsx('cursor-pointer')} active={false} />
      <IconCreate className={clsx('cursor-pointer')} active={false} />
      <IconCompass className={clsx('cursor-pointer')} active={false} />
      <IconHeart className={clsx('cursor-pointer')} active={false} />
    </div>
  );
};

export default HeaderRight;