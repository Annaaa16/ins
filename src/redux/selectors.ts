import { useStoreSelector } from './store';

export const useCounterSelector = () => useStoreSelector((state) => state.counter);
