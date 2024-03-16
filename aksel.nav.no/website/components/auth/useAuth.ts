import { useRouter } from "next/router";

export const useAuth = (addRedirect?: boolean) => {
  const { push, asPath } = useRouter();

  const login = async () => {
    push(
      {
        pathname: `/oauth2/login`,
        query: {
          redirect: asPath,
          scrollToFeedback: addRedirect ? true : undefined,
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const logout = async () => {
    push(`/oauth2/logout?redirect=${asPath}`, undefined, {
      shallow: true,
    });
  };

  return { login, logout };
};
