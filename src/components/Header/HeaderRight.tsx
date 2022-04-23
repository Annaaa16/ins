import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';

import IconCompass from '../Icon/IconCompass';
import IconCreate from '../Icon/IconCreate';
import IconHeart from '../Icon/IconHeart';
import IconHome from '../Icon/IconHome';
import IconMessenger from '../Icon/IconMessenger';

const HeaderRight = () => {
  const { showModal } = useModalContext();

  return (
    <div className='flex justify-end gap-x-5'>
      <IconHome className={clsx('cursor-pointer')} active />
      <IconMessenger className={clsx('cursor-pointer')} active={false} />
      <IconCreate
        onClick={() => showModal(MODAL_TYPES.POST_CREATOR)}
        className={clsx('cursor-pointer')}
        active={false}
      />
      <IconCompass className={clsx('cursor-pointer')} active={false} />
      <IconHeart className={clsx('cursor-pointer')} active={false} />
    </div>
  );
};

export default HeaderRight;
