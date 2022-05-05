import { useRef } from 'react';

// types
import { Callback } from '~/types/utils';

export const useDoubleTab = (delay = 300) => {
  const lastTabRef = useRef<number>(0);

  const doubleTab = (callback: Callback) => {
    const now = Date.now();

    if (lastTabRef.current && now - lastTabRef.current < delay) callback();
    else lastTabRef.current = now;
  };

  return [doubleTab] as const;
};
