import React from "react";
import { WebPreviewWrapper } from "./WebPreviewWrapper";

export const ComponentPageWebPreview = (ctx: any) => {
  const slug = ctx.document.displayed?.slug?.current;

  if (!slug) {
    return <div>Side må ha en url/slug før den kan forhåndsvises...</div>;
  }

  const webUrl = "https://aksel.nav.no";
  const previewUrl = `/preview/${slug}`;
  const url =
    process.env.NODE_ENV === "production"
      ? webUrl + previewUrl
      : `http://localhost:3000${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};
