import { useLiveQuery } from "next-sanity/preview";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { runResolvers } from "./resolvers";
import { ResolverT } from "./types";

const PreviewBanner = dynamic(() => import("@/web/PreviewBanner"), {
  ssr: false,
});

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
