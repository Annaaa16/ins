import { useRouter } from 'next/router';

// types
import { Callback } from '~/types/utils';

import { ROUTES } from '~/constants';
import { useLogoutMutation, UserFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';

type VisitProfile = (username: string, callback?: Callback) => void;

interface UseUserReturn {
  currentUser: UserFragment;
  visitProfile: VisitProfile;
  logout: () => Promise<void>;
}

export const useUser = (): UseUserReturn => {
  const currentUser = useAuthSelector().currentUser!;

  const [logoutMutate] = useLogoutMutation();
  const router = useRouter();

  const visitProfile: VisitProfile = async (username, callback) => {
    await router.push(username);

    if (callback) callback();
  };

  const logout = async () => {
    const response = await logoutMutate();

    if (response.data?.logout.success) router.push(ROUTES.LOGIN);
  };

  return { currentUser, visitProfile, logout };
};
