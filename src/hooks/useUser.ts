import { useRouter } from 'next/router';

// types
import { Callback } from '~/types/utils';

type VisitProfile = (username: string, callback?: Callback) => void;

interface UseUserReturn {
  visitProfile: VisitProfile;
}

export const useUser = (): UseUserReturn => {
  const router = useRouter();

  const visitProfile: VisitProfile = async (username, callback) => {
    await router.push(username);

    if (callback) callback();
  };

  return { visitProfile };
};
