import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clientConfig } from "@/sanity/config";

export const SanityDataContext = createContext<{
  id?: string;
  validUser: boolean | null;
} | null>(null);

export const SanityDataProvider = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  const [user, setUser] = useState<boolean | null>(null);

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
      } catch {
        setUser(false);
      }
      setUser(false);
    };
    fetchUser();
  }, []);

  const contextValue = useMemo(() => ({ id, validUser: user }), [id, user]);

  return (
    <SanityDataContext.Provider value={contextValue}>
      {children}
    </SanityDataContext.Provider>
  );
};

export const useSanityData = () => {
  const ctx = useContext(SanityDataContext);
  if (!ctx) {
    console.error(
      "useSanityData has to be used inside SanityDataContext.provider",
    );
  }
  return ctx;
};
