import type { UrlResolver } from "sanity-plugin-iframe-pane";
import { landingsider, previews } from "@/sanity/config";

type SlugDocument = {
  _type?: string;
  slug?: { current?: string };
};

export const resolveProductionUrlAppdir: UrlResolver = (doc) => {
  const rootPath = `${window.location.protocol}//${window.location.host}`;

  const toUrl = (path?: string) => (path ? `${rootPath}/${path}` : "");

  const typedDoc = doc as SlugDocument | undefined;
  const type = typedDoc?._type;

  if (!type) {
    return rootPath;
  }

  const slug = typedDoc?.slug?.current;

  if (previews.includes(type)) {
    return toUrl(slug);
  }

  const landingsside = landingsider.find((x) => x.name === type);
  if (landingsside) {
    return toUrl(landingsside.url);
  }

  if (type === "gp.tema") {
    return toUrl(slug && `god-praksis/${slug}`);
  }

  if (type === "gp_endringslogg_artikkel") {
    return toUrl(slug && `god-praksis/endring/${slug}`);
  }

  return rootPath;
};
