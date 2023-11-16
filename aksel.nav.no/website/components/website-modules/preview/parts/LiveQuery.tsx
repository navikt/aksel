import { useLiveQuery } from "next-sanity/preview";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

const PreviewBanner = dynamic(() => import("@/web/PreviewBanner"), {
  ssr: false,
});

export type ResolverT = { key: string; cb: (v: any) => any }[];

function LiveQuery({
  comp: Comp,
  query,
  params,
  props,
  resolvers,
}: {
  comp: ComponentType;
  query: string;
  props: any;
  params?: any;
  resolvers?: ResolverT;
}) {
  const [data, loading] = useLiveQuery(props, query, params);

  const _data = loading
    ? props
    : runResolvers({ resolvers, data: { ...props, ...data } });

  return (
    <>
      <PreviewBanner loading={loading} />
      <Comp {..._data} />
    </>
  );
}

export default LiveQuery;

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
