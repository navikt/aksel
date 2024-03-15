import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async (anchor = "") => {
    const redirect = router.asPath + encodeURIComponent(anchor);
    console.log({ redirect });
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
