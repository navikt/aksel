import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = (loginRedirectId?: string) => {
  const { replace, push, query, asPath } = useRouter();

  const login = async () => {
    push(
      {
        pathname: `/oauth2/login`,
        query: {
          redirect: asPath,
          scrollToFeedback: loginRedirectId ? true : undefined,
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

  useEffect(() => {
    if (!loginRedirectId || !query.scrollToFeedback) return;
    const _query = { ...query };
    delete _query.scrollToFeedback;
    replace({ query: _query }, undefined, { shallow: true });
    const item = document.getElementById(loginRedirectId);
    item?.focus();
  }, [loginRedirectId, query, replace]);

  return { login, logout };
};
