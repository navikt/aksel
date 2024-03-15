import { useRouter } from "next/router";

export const useAuth = (loginRedirectId?: string) => {
  const router = useRouter();

  const login = async () => {
    router.push(
      {
        pathname: `/oauth2/login?redirect=${router.asPath}`,
        query: { scrollToFeedback: loginRedirectId ? true : undefined },
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

  if (loginRedirectId && router.query?.scrollToFeedback) {
    const query = router.query;
    delete query.scrollToFeedback;
    router.replace({ query }, undefined, { shallow: true });
    document.getElementById(loginRedirectId)?.focus();
  }

  return { login, logout };
};
