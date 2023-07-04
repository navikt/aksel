import { clientConfig } from "@/sanity/config";
import { useEffect, useState } from "react";

export const useCheckAuth = () => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://${clientConfig.projectId}.api.sanity.io/v1/users/me`,
        {
          credentials: "include",
        }
      ).then((x) => x.text());
      try {
        setUser(!!JSON.parse(response)?.id);
        return;
      } catch (e) {
        setUser(false);
      }
      setUser(false);
    };
    fetchUser();
  }, []);

  return user;
};
