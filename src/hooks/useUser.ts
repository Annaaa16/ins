import { useRouter } from 'next/router';

interface UseUserReturn {
  visitProfile: (username: string) => void;
}

export const useUser = (): UseUserReturn => {
  const router = useRouter();

  const visitProfile = (username: string) => {
    router.push(username);
  };

  return { visitProfile };
};
