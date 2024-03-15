import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const login = async (anchor = "") => {
    const redirect = router.asPath + anchor;
    router.push(
      {
        href: `/oauth2/login`,
        query: { redirect },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const logout = async () => {
    router.push(`/oauth2/logout?redirect=${router.asPath}`, undefined, {
      shallow: true,
    });
  };

  return { login, logout };
};
