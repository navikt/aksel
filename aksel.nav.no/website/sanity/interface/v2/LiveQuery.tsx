import { useLiveQuery } from "next-sanity/preview";
import dynamic from "next/dynamic";
import { PreviewProps } from "./types";

const PreviewBanner = dynamic(() => import("@/web/PreviewBanner"), {
  ssr: false,
});

function LiveQuery({ children, query, params, props }: PreviewProps) {
  const [data, loading] = useLiveQuery(props, query, params);

  return (
    <>
      <PreviewBanner loading={loading} />
      {children({ ...props, ...data }, loading)}
    </>
  );
}

export default LiveQuery;
