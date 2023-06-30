import { clientConfig } from "@/sanity/config";
import { useState, useEffect } from "react";
import { useCurrentUser } from "sanity";

export const useCheckAuth = () => {
  /* const [user, setUser] = useState<boolean>(true); */
  /* const user = useCurrentUser(); */
  /* useEffect(() => {
    const handleAuth = async () => {
      user =
      _checkAuth(clientConfig.projectId, null).then(setUser);
    };
    handleAuth();
  }, []); */

  return true;
};
