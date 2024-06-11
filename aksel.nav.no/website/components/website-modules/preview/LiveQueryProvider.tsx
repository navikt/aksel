import { LiveQueryProvider as SanityLiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import { previewDraftsClient } from "@/sanity/client.server";
import LiveQuery from "./LiveQuery";
import { PreviewProps } from "./Preview.types";

const LiveQueryProvider = ({
  query,
  params,
  props,
  children,
}: PreviewProps) => {
  const client = useMemo(previewDraftsClient, []);

  return (
    <SanityLiveQueryProvider client={client}>
      <LiveQuery props={props} query={query} params={params}>
        {children}
      </LiveQuery>
    </SanityLiveQueryProvider>
  );
};

export default LiveQueryProvider;
