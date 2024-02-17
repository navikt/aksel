import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import { getDraftClient } from "./client";

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(
    () => getDraftClient({ draftMode: true, token }),
    [token],
  );
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
