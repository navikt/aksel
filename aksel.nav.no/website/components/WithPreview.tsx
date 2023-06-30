import { useLiveQuery } from "next-sanity/preview";
import { ComponentType } from "react";

import { getClient } from "@/sanity/client.server";
import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import PreviewBanner from "components/website-modules/PreviewBanner";

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

function LiveQuery({
  comp: Comp,
  query,
  params,
  props,
}: {
  comp: ComponentType;
  query: string;
  props: any;
  params?: any;
}) {
  const [data, loading] = useLiveQuery(props, query, params);

  return (
    <>
      <PreviewBanner loading={loading} />
      <Comp {...props} {...data} />;
    </>
  );
}

const WithPreview = ({
  comp,
  query,
  params,
  props,
}: {
  comp;
  query: string;
  props: any;
  params?: any;
}) => {
  return (
    <PreviewProvider>
      <LiveQuery props={props} query={query} params={params} comp={comp} />
    </PreviewProvider>
  );
};

export default WithPreview;
