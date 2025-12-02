import fs from "fs";
import https from "https";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "public", "sanity-assets");

export async function downloadAssets(assets: any) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Found ${assets.length} assets to download.`);

  for (const asset of assets) {
    if (!asset.url) {
      console.warn(`Asset ${asset._id} has no URL.`);
      continue;
    }

    // Parse filename from _id
    // _id format: image-hash-widthxheight-ext or file-hash-ext
    const parts = asset._id.split("-");
    const ext = parts[parts.length - 1];
    const filename = parts.slice(1, parts.length - 1).join("-") + "." + ext;

    const dest = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(dest)) {
      console.log(`Skipping ${filename} (already exists)`);
      continue;
    }

    console.log(`Downloading ${filename}...`);
    try {
      await downloadFile(asset.url, dest);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err);
    }
  }
  console.log("Done!");
}

async function downloadFile(url: string, dest: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`),
          );
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}
