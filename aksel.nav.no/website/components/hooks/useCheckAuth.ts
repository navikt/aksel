import { useEffect, useState } from "react";
import { clientConfig } from "@/sanity/config";

export const useCheckAuth = (skipCheck?: boolean) => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://${clientConfig.projectId}.api.sanity.io/v1/users/me`,
        {
          credentials: "include",
        },
      ).then((x) => x.text());
      try {
        setUser(!!JSON.parse(response)?.id);
        return;
      } catch (e) {
        setUser(false);
      }
      setUser(false);
    };
    if (!skipCheck) {
      fetchUser();
    }
  }, [skipCheck]);

  return user;
};
