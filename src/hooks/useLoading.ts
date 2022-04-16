import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async <T>(action: () => Promise<T>) => {
    setLoading(true);

    try {
      return await action();
    } finally {
      setLoading(false);
    }
  };

  return [loading, handleAction] as const;
};
