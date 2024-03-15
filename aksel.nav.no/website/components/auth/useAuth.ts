import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async (anchor = "") => {
    console.log({ anchor });
    const redirect = encodeURIComponent(router.asPath + anchor);
    router.push(`/oauth2/login?redirect=${redirect}`, undefined, {
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
