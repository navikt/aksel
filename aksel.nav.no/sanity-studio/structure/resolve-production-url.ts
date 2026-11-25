import type { UrlResolver } from "sanity-plugin-iframe-pane";
import { SchemaConfig } from "../schema/schema.config";

type SlugDocument = {
  _type?: string;
  slug?: { current?: string };
};

export const resolveProductionUrlAppdir: UrlResolver = (doc) =>
  resolveUrl(doc, `${window.location.protocol}//${window.location.host}`);

export const resolveUrl = (doc: unknown, rootPath: string) => {
  const toUrl = (path?: string) => (path ? `${rootPath}/${path}` : "");

  const typedDoc = doc as SlugDocument | undefined;
  const type = typedDoc?._type;

  if (!type) {
    return rootPath;
  }

  const slug = typedDoc?.slug?.current;

  if (SchemaConfig.previews.includes(type)) {
    return toUrl(slug);
  }

  const landingsside = SchemaConfig.landingsider.find((x) => x.name === type);
  if (landingsside) {
    return toUrl(landingsside.url);
  }

  if (type === "gp.tema") {
    return toUrl(slug && `god-praksis/${slug}`);
  }

  if (type === "gp_endringslogg_artikkel") {
    return toUrl(slug && `god-praksis/endring/${slug}`);
  }

  if (type === "ds_endringslogg_artikkel") {
    return toUrl(slug && `grunnleggende/endringslogg/${slug}`);
  }

  return rootPath;
};
