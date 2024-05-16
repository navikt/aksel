import { useLiveQuery } from "next-sanity/preview";
import dynamic from "next/dynamic";
import { runResolvers } from "./resolvers";
import type { PreviewProps } from "./types";

const PreviewBanner = dynamic(() => import("@/web/PreviewBanner"), {
  ssr: false,
});

function LiveQuery({
  comp: Comp,
  query,
  params,
  props,
  resolvers,
}: PreviewProps) {
  const [data, loading] = useLiveQuery(props, query, params);

  const _data = loading ? props : runResolvers({ resolvers, data });

  return (
    <>
      <PreviewBanner loading={loading} />
      <Comp {..._data} />
    </>
  );
}

export default LiveQuery;
