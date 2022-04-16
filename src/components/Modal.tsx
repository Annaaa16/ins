import { ReactNode } from 'react';

import clsx from 'clsx';

import { useModalSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';

import IconClose from './Icon/IconClose';
import { modalActions } from '~/redux/slices/modalSlice';

interface ModalProps {
  className?: string;
  children: ReactNode;
}

const Modal = ({ className, children }: ModalProps) => {
  const { isOpen } = useModalSelector();

  const dispatch = useStoreDispatch();

  const closeModal = () => dispatch(modalActions.close());

  if (!isOpen) return null;

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

export default Modal;
