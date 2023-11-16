import { getClient } from "@/sanity/client.server";
import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";

function PreviewProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return getClient().withConfig({
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }, []);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}

export default PreviewProvider;
