import { createContext, ReactNode, useContext, useState } from 'react';

// types
import { Callback } from '~/types/utils';

import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';

import ModalPostActions from '~/components/Modal/ModalPostActions';
import ModalPostCreator from '~/components/Modal/ModalPostCreator';

interface ModalInitState {
  showModal: (dialogType: DialogType, callback?: Callback) => void;
  hideModal: (callback?: Callback) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

type DialogType = keyof typeof MODAL_TYPES | null;

export const MODAL_TYPES = {
  POST_CREATOR: 'POST_CREATOR',
  POST_ACTIONS: 'POST_ACTIONS',
} as const;

const ModalContext = createContext<ModalInitState>({
  showModal: () => null,
  hideModal: () => null,
});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [dialog, setDialog] = useState<DialogType>(null);

  const dispatch = useStoreDispatch();

  const showModal = (dialogType: DialogType, callback?: Callback) => {
    setDialog(dialogType);

    if (callback) callback();
  };

  const hideModal = (callback?: Callback) => {
    setDialog(null);
    dispatch(postActions.setSelectedPost(null));

    if (callback) callback();
  };

  const renderDialog = () => {
    switch (dialog) {
      case MODAL_TYPES.POST_CREATOR:
        return <ModalPostCreator />;
      case MODAL_TYPES.POST_ACTIONS:
        return <ModalPostActions />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {renderDialog()}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
