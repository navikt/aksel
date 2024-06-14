import { LiveQueryProvider as SanityLiveQueryProvider } from "next-sanity/preview";
import { previewDraftsClient } from "@/sanity/client.server";
import LiveQuery from "./LiveQuery";
import { PreviewProps } from "./Preview.types";

const client = previewDraftsClient();

const LiveQueryProvider = ({
  query,
  params,
  props,
  children,
}: PreviewProps) => {
  return (
    <SanityLiveQueryProvider client={client}>
      <LiveQuery props={props} query={query} params={params}>
        {children}
      </LiveQuery>
    </SanityLiveQueryProvider>
  );
};

export default LiveQueryProvider;
