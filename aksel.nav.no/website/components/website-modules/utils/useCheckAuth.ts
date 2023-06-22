import { clientConfig } from "@/sanity/config";
import { useState, useEffect } from "react";

export const useCheckAuth = () => {
  const [user, setUser] = useState<boolean>(true);

  useEffect(() => {
    const handleAuth = async () => {
      const _checkAuth = (await import("@sanity/preview-kit"))._checkAuth;
      _checkAuth(clientConfig.projectId, null).then(setUser);
    };
    handleAuth();
  }, []);

  return user;
};
