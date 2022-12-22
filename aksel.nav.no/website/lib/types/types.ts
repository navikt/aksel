export type SidebarT = {
  heading: string;
  slug: string;
  kategori: string;
  tag?: string;
}[];

export type PageTypeT = {
  type: "Komponenter" | "Grunnleggende";
  title: string;
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

export type FeedbackT = {
  message: string;
  url: string;
  docId: string;
  type?: "ja" | "nei" | "forslag" | "footer";
};
