import { definePreview } from "next-sanity/preview";
import { ComponentType } from "react";
import { config } from "../lib/sanity/config";

const usePreview = definePreview(config);

const WithPreview = ({
  comp: Comp,
  query,
  params,
}: {
  comp: ComponentType;
  query: string;
  params?: any;
}) => {
  const data = usePreview(null, query, params);
  return <Comp {...data} />;
};

export default WithPreview;
