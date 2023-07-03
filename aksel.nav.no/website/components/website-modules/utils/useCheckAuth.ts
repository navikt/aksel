import { clientConfig } from "@/sanity/config";
import { useEffect, useState } from "react";
let globalUser = null;

export const useCheckAuth = () => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    if (globalUser !== null) {
      return;
    }
    const fetchUser = async () => {
      const response = await fetch(
        `https://${clientConfig.projectId}.api.sanity.io/v1/users/me`,
        {
          credentials: "include",
        }
      ).then((x) => x.text());
      try {
        setUser(!!JSON.parse(response)?.id);
        globalUser = !!JSON.parse(response)?.id;
        return;
      } catch (e) {
        console.log("Failed fetching user from sanity");
      }
      setUser(false);
      globalUser = false;
    };
    fetchUser();
  }, []);

  return user;
};
