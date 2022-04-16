import { useStoreSelector } from './store';

export const usePostSelector = () => useStoreSelector((state) => state.post);

export const useModalSelector = () => useStoreSelector((state) => state.modal);
