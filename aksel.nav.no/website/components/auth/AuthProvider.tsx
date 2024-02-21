import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const validateUser = async () => {
      const valid = await fetch("/api/auth/v1/validate-user")
        .then((res) => res.ok)
        .catch(() => false);

      console.log("fetch: ", valid);
      valid && setValidUser(true);
      setLoading(false);
    };
    validateUser();
  }, []);

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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: validUser, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
