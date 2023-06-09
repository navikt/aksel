import dotenv from "dotenv";
import fs from "fs";
import { allArticleDocuments } from "../sanity/config";
import { noCdnClient } from "../sanity/interface/client.server";
dotenv.config();

main();

async function main() {
  await createIndex();
}

async function createIndex() {
  const data = await noCdnClient(process.env.SANITY_PRIVATE_NO_DRAFTS)
    .fetch(
      `*[_type in [${allArticleDocuments.map((x) => `"${x}"`)}]]{
    heading,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
    status,
    _type,
    "intro": pt::text(intro.body),
    content
  }`
    )
    .catch((err) => {
      throw new Error(err);
    });

  if (data.length === 0) {
    throw new Error(
      "Searchindex is empty, something went wrong when retrieving data from Sanity."
    );
  }

  fs.writeFileSync(
    "./public/searchindex.json",
    JSON.stringify(sanitzeSanityData(data))
  );
}

function sanitzeSanityData(data: any[]) {
  return data.map((x) => ({
    ...x,
    lvl2: getHeadings(x?.content, "h2"),
    lvl3: getHeadings(x?.content, "h3"),
    lvl4: getHeadings(x?.content, "h4"),
    content: toPlainText(x?.content),
  }));
}

function getHeadings(blocks: any[], block: "h2" | "h3" | "h4") {
  if (!blocks || blocks.length === 0) {
    return "";
  }
  return blocks
    .filter((x) => x.style === block)
    .map((x) => ({ text: x.children[0].text, id: x._key ?? "" }));
}

function toPlainText(blocks: any[]) {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  return blocks
    .filter((x) => x.style === "normal")
    .map((x) => x.children[0].text)
    .join(" ")
    .replace(/\n|\r/g, " ");
}
