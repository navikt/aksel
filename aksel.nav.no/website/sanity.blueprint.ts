import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";
import { allArticleDocuments } from "./sanity/config";

const allPublishedAtDocuments = `[${allArticleDocuments.map((t) => `"${t}"`).join(", ")}]`;
const allVerifiedDocuments = `[${[
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
]
  .map((t) => `"${t}"`)
  .join(", ")}]`;

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: "first-publish",
      event: {
        on: ["create"],
        filter: `_type in ${allPublishedAtDocuments} && !defined(publishedAt)`,
        projection: "{_id}",
      },
      src: "./sanity/functions/first-publish",
    }),
    defineDocumentFunction({
      name: "first-verified-at",
      event: {
        on: ["create"],
        filter: `_type in ${allVerifiedDocuments} && !defined(updateInfo.lastVerified)`,
        projection: "{_id}",
      },
      src: "./sanity/functions/first-verified-at",
    }),
  ],
});
