import { definePreview } from "next-sanity/preview";
import { ComponentType } from "react";
import { clientConfig } from "@/sanity/config";

const usePreview = definePreview({
  ...clientConfig,
  subscriptionThrottleMs: 200,
});

const WithPreview = ({
  comp: Comp,
  query,
  params,
  props,
}: {
  comp: ComponentType;
  query: string;
  props: any;
  params?: any;
}) => {
  const data = usePreview(null, query, params);
  return <Comp {...props} {...data} />;
};

export default WithPreview;
