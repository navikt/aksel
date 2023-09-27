export enum HelpfulArticleEnum {
  "JA" = "ja",
  "DELVIS" = "delvis",
  "NEI" = "nei",
  "MISC" = "misc",
}

export type FeedbackT = {
  message: string;
  url: string;
  docId: string;
  type?: "ja" | "nei" | "forslag" | "footer" | "uu";
};
