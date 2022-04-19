import { ReactNode } from 'react';

import clsx from 'clsx';

import { useModalContext } from '~/contexts/ModalContext';

import IconClose from '../Icon/IconClose';

interface ModalProps {
  children: ReactNode;
  className?: string;
}

const ModalWrapper = ({ className, children }: ModalProps) => {
  const { hideModal } = useModalContext();

  const closeModal = () => hideModal();

  return (
    <div className={clsx('fixed inset-0 z-50', 'flex m-auto')}>
      <div onClick={closeModal} className={clsx('absolute inset-0', 'bg-modal')} />
      <IconClose
        onClick={closeModal}
        className={clsx('absolute top-3 right-3', 'p-1 lg:p-0', 'cursor-pointer')}
      />
      <div className={clsx('relative', 'm-auto', 'animate-zoomIn', className)}>{children}</div>
    </div>
  );
};

export default ModalWrapper;
