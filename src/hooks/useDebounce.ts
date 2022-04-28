import { ChangeEvent, useRef, useState } from 'react';

// types
import { Callback } from '~/types/utils';

import { isEmptyInput } from '~/helpers/string';

export const useDebounce = (timing = 300) => {
  const [debouncing, setDebouncing] = useState<boolean>(false);

  const debounceRef = useRef<number | null>(null);

  const clearDebounce = () => {
    if (debounceRef.current != null) clearTimeout(debounceRef.current);
  };

  const handleDebounce = <T>(
    callback: (value: string) => Promise<T>,
    emptyInputHandler?: Callback,
  ) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (isEmptyInput(e.target.value)) {
        if (emptyInputHandler) emptyInputHandler();

        clearDebounce();
        setDebouncing(false);

        return;
      }

      setDebouncing(true);
      clearDebounce();

      debounceRef.current = window.setTimeout(async () => {
        try {
          await callback(e.target.value);
        } finally {
          setDebouncing(false);
        }
      }, timing);
    };
  };

  return [debouncing, handleDebounce] as const;
};
