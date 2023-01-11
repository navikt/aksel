import { definePreview } from "next-sanity/preview";
import { ComponentType } from "react";
import { config } from "../lib/sanity/config";

const usePreview = definePreview(config);

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
