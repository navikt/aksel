/// <reference types="vite/client" />

declare module "*.svg?component" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}

declare module "**/metadata.mjs" {
  export type AkselIcon = {
    id: string;
    name: string;
    category: string;
    sub_category: "Time";
    keywords: string[];
    variant: "stroke" | "fill";
    updated_at: Date;
    created_at: Date;
  };

  declare const metadata: {
    [iconId: string]: AkselIcon;
  };

  export default metadata;
}
