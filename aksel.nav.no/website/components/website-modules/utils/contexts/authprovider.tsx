import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextProps = {
  status:
    | "NO_FETCHED"
    | "IS_NOT_AUTHENTICATED"
    | "IS_AUTHENTICATED"
    | "FAILURE";
  login: () => void;
  logout: () => void;
  user?: { name: string; mail: string };
};

export const AuthenticationContext = createContext<AuthContextProps | null>(
  null
);

export const AuthenticationStatus = {
  NOT_FETCHED: "NO_FETCHED",
  NOT_AUTHENTICATED: "IS_NOT_AUTHENTICATED",
  IS_AUTHENTICATED: "IS_AUTHENTICATED",
  FAILURE: "FAILURE",
};

export const AuthProvider = (props: any) => {
  const router = useRouter();

  const [state, setState] = useState<{
    status: string;
    user?: { name: string; mail: string };
  }>({ status: AuthenticationStatus.NOT_FETCHED });

  const login = () => {
    router.push(
      `${window.location.origin}/oauth2/login?redirect=${window.location.pathname}${window.location.search}`
    );
  };

  const logout = () => {
    fetch("/oauth2/logout/frontchannel", {
      headers: {
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
      },
    })
      .then(() => router.reload())
      .catch(() => router.reload());
  };

  const fetchIsAuthenticated = useCallback(() => {
    fetch(`/api/auth`)
      .then(async (response) => {
        const json = await response.json();
        if (json?.status === 200) {
          setState({
            status: AuthenticationStatus.IS_AUTHENTICATED,
            user: { name: json?.name, mail: json?.mail },
          });
        } else if (json?.status === 401) {
          setState({
            status: AuthenticationStatus.NOT_AUTHENTICATED,
          });
        } else {
          setState({
            status: AuthenticationStatus.FAILURE,
          });
        }
      })
      .catch(() => {
        setState({
          status: AuthenticationStatus.FAILURE,
        });
      });
  }, []);

  useEffect(() => {
    fetchIsAuthenticated();
  }, [router, fetchIsAuthenticated]);

  /* useEffect(() => {
    console.log({ state: pageProps });
    if (pageProps?.validUser === undefined) return;
    if (!pageProps?.validUser) {
      setState({ status: AuthenticationStatus.NOT_AUTHENTICATED });
      console.log("Should run if validuser is false");
    }
  }, [pageProps?.validUser]); */

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{
        user: state?.user,
        status: state.status,
        /* user: { name: "Normann, Ola", mail: "123" },
        status: "IS_AUTHENTICATED", */
        login,
        logout,
      }}
    />
  );
};
