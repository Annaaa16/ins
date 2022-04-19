import { useStoreSelector } from './store';

export const usePostSelector = () => useStoreSelector((state) => state.post);

export const useAuthSelector = () => useStoreSelector((state) => state.auth);
