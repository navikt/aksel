import { getClient } from "@/sanity/client.server";
import { useLiveQuery, LiveQueryProvider } from "next-sanity/preview";
import { useMemo, ComponentType } from "react";
import dynamic from "next/dynamic";
import { useCheckAuth } from "components/website-modules/utils/useCheckAuth";

export const PreviewBanner = dynamic(
  () => import("components/website-modules/PreviewBanner"),
  {
    ssr: false,
  }
);

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
