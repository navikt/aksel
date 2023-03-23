import { createClient } from "@sanity/client";
import exportDataset from "@sanity/export";
import { config } from "../lib/sanity/config";
const sanityToken = process.env.SANITY_PREVIEW_TOKEN;

if (!sanityToken) {
  throw new Error("Could not find token from SANITY_PREVIEW_TOKEN");
}

const client = createClient({
  ...config,
  dataset: "production",
  token: sanityToken,
});

const main = async () => {
  const time = Date.now();
  await exportDataset({
    // Instance of @sanity/client configured to correct project ID and dataset
    client: client,

    // Name of dataset to export
    dataset: "production",

    // Path to write tar.gz-archive file to, or `-` for stdout
    outputPath: `backup-${time}.tar.gz`,

    // Whether or not to export assets. Note that this operation is currently slightly lossy;
    // metadata stored on the asset document itself (original filename, for instance) might be lost
    // Default: `true`
    assets: true,

    // Exports documents only, without downloading or rewriting asset references
    // Default: `false`
    raw: false,

    // Whether or not to export drafts
    // Default: `true`
    drafts: true,

    // Run 12 concurrent asset downloads
    assetConcurrency: 12,
  });
};

main();
