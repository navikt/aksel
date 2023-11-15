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

type ResolverT = { key: string; cb: (v: any) => any }[];

function runResolvers({
  resolvers,
  data,
}: {
  resolvers: ResolverT;
  data: any;
}) {
  if (!resolvers) {
    return data;
  }

  const _data = { ...data };

  resolvers.forEach((resolver) => {
    if (resolver.key in _data) {
      _data[resolver.key] = resolver.cb(_data[resolver.key]);
    }
  });

  return _data;
}

function LiveQuery({
  comp: Comp,
  query,
  params,
  props,
  validUser,
  resolvers,
}: {
  comp: ComponentType;
  query: string;
  props: any;
  params?: any;
  validUser: boolean;
  resolvers?: ResolverT;
}) {
  const [data, loading] = useLiveQuery(props, query, params);

  const _data = loading
    ? props
    : runResolvers({ resolvers, data: { ...data } });

  console.log([props.sidebar, _data.sidebar]);
  return (
    <>
      <PreviewBanner loading={loading} validUser={validUser} />
      <Comp {..._data} />
    </>
  );
}

const WithPreview = ({
  comp,
  query,
  params,
  props,
  resolvers,
}: {
  comp;
  query: string;
  props: any;
  params?: any;
  resolvers?: ResolverT;
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
        resolvers={resolvers}
      />
    </PreviewProvider>
  );
};

export default WithPreview;
