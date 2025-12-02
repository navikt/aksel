import { createClient } from "@sanity/client";
import fs from "fs";
import { clientConfig } from "./sanity/config";

/* yarn tsx --env-file-if-exists=.env cloneDatabase.ts */
/**
 * List of document types that should be preserved during a content migration.
 */
const alltypes = [
  "grunnleggende_landingsside",
  "komponenter_landingsside",
  "token_kategori",
  "kode_eksempler_fil",
  "komponent_artikkel",
  "ds_artikkel",
  "ds_props",
  "aksel_standalone",
  "redirect",
  "aksel_ds_forside",
  "aksel_forside",
  "sanity.fileAsset",
  "sanity.imageAsset",
];

const main = async () => {
  const token = process.env.SANITY_READ;

  if (!token) {
    throw new Error("Missing token 'SANITY_READ'");
  }

  const client = createClient({
    ...clientConfig,
    token,
    useCdn: false,
    perspective: "published",
  });

  console.info(
    `Connecting to project: ${clientConfig.projectId}, dataset: ${clientConfig.dataset}`,
  );

  // Filter out asset types for the initial fetch
  const docTypes = alltypes.filter(
    (t) => t !== "sanity.fileAsset" && t !== "sanity.imageAsset",
  );

  console.info("Fetching documents of types:", docTypes.join(", "));

  const docs = await client.fetch(`*[_type in $types]`, { types: docTypes });
  console.info(`Fetched ${docs.length} documents.`);

  const remoteAssets = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]`,
  );
  const assetIds = new Set();

  const traverse = (obj) => {
    if (!obj || typeof obj !== "object") return;

    if (obj._ref && typeof obj._ref === "string") {
      if (obj._ref.startsWith("image-") || obj._ref.startsWith("file-")) {
        assetIds.add(obj._ref);
      }
    }

    for (const key in obj) {
      traverse(obj[key]);
    }
  };

  docs.forEach(traverse);

  const assetsToKeep = [];

  for (const asset of remoteAssets) {
    if (assetIds.has(asset._id)) {
      assetsToKeep.push(asset);
    }
  }

  console.info(`Found ${assetsToKeep.length} referenced assets.`);

  const outPathDocs = "doc-data.json";
  const outPathAssets = "doc-data-assets.json";
  fs.writeFileSync(outPathDocs, JSON.stringify(docs, null, 2));
  fs.writeFileSync(outPathAssets, JSON.stringify(assetsToKeep, null, 2));

  console.info(`Wrote ${docs.length} documents to ${outPathDocs}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
