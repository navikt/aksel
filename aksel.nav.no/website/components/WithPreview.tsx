import { useLiveQuery } from "next-sanity/preview";
import { ComponentType } from "react";

import { getClient } from "@/sanity/client.server";
import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";

function PreviewProvider({
  children,
}: /* token, */
{
  children: React.ReactNode;
  /* token: string; */
}) {
  const client = useMemo(() => getClient(), []);
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

  if (loading) {
    return <>Loading...</>;
  }

  return <Comp {...props} {...data} />;
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
