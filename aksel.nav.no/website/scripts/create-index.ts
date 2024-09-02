import dotenv from "dotenv";
import fs from "fs";
import { groupBy, omit } from "lodash";
import { allArticleDocuments } from "../sanity/config";
import { noCdnClient } from "../sanity/interface/client.server";

dotenv.config();

main();

async function main() {
  await createIndex();
}

async function createIndex() {
  const token = process.env.SANITY_READ_NO_DRAFTS;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_READ_NO_DRAFTS' for generating searchindex",
    );
  }
  const data = await noCdnClient(token)
    .fetch(
      `*[_type in [${allArticleDocuments.map(
        (x) => `"${x}"`,
      )}]]| order(publishedAt desc){
    heading,
    "slug": slug.current,
    "tema": undertema[]->tema->title,
    ingress,
    status,
    _type,
    "intro": pt::text(intro.body),
    content,
    publishedAt,
    seo
  }`,
    )
    .catch((err) => {
      throw new Error(err);
    });

  if (data.length === 0) {
    throw new Error(
      "Searchindex is empty, something went wrong when retrieving data from Sanity.",
    );
  }

  fs.writeFileSync(
    "./public/searchindex.json",
    JSON.stringify(sanitzeSanityData(data)),
  );
}

function sanitzeSanityData(data) {
  return data
    .sort((a, b) => {
      if (!a.publishedAt && !b.publishedAt) {
        return 0;
      }
      if (!a.publishedAt) {
        return 1;
      }
      if (!b.publishedAt) {
        return -1;
      }

      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .map((x) => ({
      ...omit(x, ["publishedAt", "seo"]),
      intro: x.intro ?? x.seo?.meta ?? "",
      lvl2: getHeadings(x.content, "h2"),
      lvl3: getHeadings(x.content, "h3"),
      lvl4: getHeadings(x.content, "h4"),
      content: mapContent(x.content),
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

function mapContent(blocks: any[]) {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  const contentBlocks: { text: string; id?: string }[] = [];

  let currentAnchor = "";
  blocks.forEach((x) => {
    if (["h2", "h3", "h4"].includes(x.style)) {
      currentAnchor = x._key ?? "";
    }
    if (x.style === "normal") {
      contentBlocks.push({
        text: x.children[0].text.replace(/\n|\r/g, " "),
        id: currentAnchor,
      });
    }
  });

  const mapped = Object.entries(groupBy(contentBlocks, "id")).map(
    ([key, value]) => ({ id: key, text: value.map((x) => x.text).join(" ") }),
  );

  return mapped;
}
