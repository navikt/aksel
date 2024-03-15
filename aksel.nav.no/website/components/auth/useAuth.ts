import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  // Currently you have to manually urlencode the fragment with `%23`
  // or you'll for some reason get `#%23` in the url (two fragments?)
  const login = async (anchor = "") => {
    const redirect = router.asPath + anchor;
    console.log({ redirect, asPath: router.asPath, anchor });
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
