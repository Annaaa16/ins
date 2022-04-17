import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async <T>(callback: () => Promise<T>) => {
    setLoading(true);

    try {
      return await callback();
    } finally {
      setLoading(false);
    }
  };

  return [loading, handleAction] as const;
};
