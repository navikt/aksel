import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import { getClient } from "@/sanity/client.server";
import LiveQuery from "./parts/LiveQuery";
import { PreviewProps } from "./parts/types";

const WithPreview = ({
  comp,
  query,
  params,
  props,
  resolvers,
}: PreviewProps) => {
  const client = useMemo(() => {
    return getClient().withConfig({
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }, []);

  return (
    <LiveQueryProvider client={client}>
      <LiveQuery
        props={props}
        query={query}
        params={params}
        comp={comp}
        resolvers={resolvers}
      />
    </LiveQueryProvider>
  );
};

export default WithPreview;
