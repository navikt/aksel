import type { SanityKeyed } from "sanity-codegen";
import SanityT from "./schema";

export type PagePropsContextT = {
  pageProps: any;
};

export type DsNavigationHeadingMenuT = {
  title: string;
  _type: "subheading" | "item";
  _key: string;
  link: {
    _id: string;
    slug: { current: string };
    status?: SanityT.Schema.komponent_artikkel["status"];
  };
};

export type DsFrontPageCardT = SanityKeyed<{
  _type: "card";
  link_ref?: {
    _id: string;
    slug: string;
  };
  title?: string;
  content?: string;
  picture?: {
    asset: any;
    crop?: any;
    hotspot?: any;
    title?: string;
  };
}>;

export type DsNavigationHeadingT = {
  _key: string;
  title: string;
  link_ref: { _id: string; slug: { current: string } };
  menu?: DsNavigationHeadingMenuT[];
};

export enum HelpfulArticleEnum {
  "JA" = "ja",
  "DELVIS" = "delvis",
  "NEI" = "nei",
  "MISC" = "misc",
}

export type HelpfulArticleT = {
  answer: HelpfulArticleEnum;
  message?: string;
  url: string;
  docId: string;
  docType: string;
};

export type DsFeddbackMsgT = {
  message: string;
  user?: string;
  url: string;
};
