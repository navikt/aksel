import {
  defineBlueprint,
  defineDocumentFunction,
  defineSyncTagInvalidateFunction,
} from "@sanity/blueprints";
import { SANITY_PROJECT_ID } from "./sanity.env";
import { SchemaConfig } from "./schema/schema.config";

const allPublishedAtDocuments = `[${SchemaConfig.allArticleDocuments.map((t) => `"${t}"`).join(", ")}]`;
const allVerifiedDocuments = `[${[
  "komponent_artikkel",
  "ds_artikkel",
  "templates_artikkel",
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
      src: "./functions/first-publish",
    }),
    defineDocumentFunction({
      name: "first-verified-at",
      event: {
        on: ["create"],
        filter: `_type in ${allVerifiedDocuments} && !defined(updateInfo.lastVerified)`,
        projection: "{_id}",
      },
      src: "./functions/first-verified-at",
    }),
    defineDocumentFunction({
      name: "unpublish",
      event: {
        on: ["delete"],
        filter: `_type in ${allVerifiedDocuments} && defined(updateInfo.lastVerified)`,
        projection: "{_id}",
      },
      src: "./functions/unpublish",
    }),
    defineSyncTagInvalidateFunction({
      name: "invalidate-tags",
      event: {
        resource: {
          type: "dataset",
          id: `${SANITY_PROJECT_ID}.production`,
        },
      },
      /*
       * Only one sync-tag-invalidate function may exist per dataset, and prod
       * and dev share the `production` dataset, so only prod is invalidated.
       * `SANITY_REVALIDATE_SECRET` is deliberately absent: blueprint env values
       * are read from the shell running `blueprints deploy`, so the secret is
       * managed with `sanity functions env add` instead.
       */
      env: {
        REVALIDATE_URL: "https://aksel.nav.no/api/webhooks/tags",
      },
    }),
  ],
});
