import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async () => {
    router.push(`/oauth2/login?redirect=${router.asPath}`, undefined, {
      shallow: true,
    });
  };

  const logout = async () => {
    router.push(`/oauth2/logout?redirect=${router.asPath}`, undefined, {
      shallow: true,
    });
  };

  return { login, logout };
};
