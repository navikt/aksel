import React from "react";
import { WebPreviewWrapper } from "./WebPreviewWrapper";

export const PageWebPreview = (ctx: any) => {
  const slug = ctx.document.displayed?.slug?.current;

  if (!slug) {
    return <div>Side må ha en url/slug før den kan forhåndsvises...</div>;
  }

  let previewUrl = `/preview/${slug}`;

  const webUrl = "https://aksel.nav.no";
  const url =
    process.env.NODE_ENV === "production"
      ? webUrl + previewUrl
      : `http://localhost:3000${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};
