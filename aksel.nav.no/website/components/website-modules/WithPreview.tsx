import { useCheckAuth } from "@/hooks/useCheckAuth";
import { getClient } from "@/sanity/client.server";
import { LiveQueryProvider, useLiveQuery } from "next-sanity/preview";
import dynamic from "next/dynamic";
import { ComponentType, useMemo } from "react";

const PreviewBanner = dynamic(() => import("@/web/PreviewBanner"), {
  ssr: false,
});

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
  validUser,
}: {
  comp: ComponentType;
  query: string;
  props: any;
  params?: any;
  validUser: boolean;
}) {
  const [data, loading] = useLiveQuery(props, query, params);

  return (
    <>
      <PreviewBanner loading={loading} validUser={validUser} />
      <Comp {...props} {...data} />
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
  const validUser = useCheckAuth();
  return (
    <PreviewProvider>
      <LiveQuery
        props={props}
        query={query}
        params={params}
        comp={comp}
        validUser={validUser}
      />
    </PreviewProvider>
  );
};

export default WithPreview;
