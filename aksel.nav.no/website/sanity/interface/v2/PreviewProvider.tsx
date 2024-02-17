import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import { getClient } from "./client";

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(() => getClient({ draftMode: true, token }), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
