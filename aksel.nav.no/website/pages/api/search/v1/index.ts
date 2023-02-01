import { GroupedHits, SearchHit, SearchResults } from "@/lib";
import { getClient } from "@/sanity-client";
import Fuse from "fuse.js";
import { NextApiRequest, NextApiResponse } from "next";
import { akselArticleFields } from "../../../../lib/sanity/queries";
import { allArticleDocuments } from "../../../../sanity/config";

/**
 * TODO:
 * - Returnere sliced matches/redusere størrelse på item.content sendt med. Kan bli 20+kB per side
 */

export default async function initialSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let doc;
  if (req.query?.doc) {
    const queryDoc = Array.isArray(req.query.doc)
      ? req.query.doc.join("")
      : req.query.doc;
    doc = queryDoc.split(",");
  } else {
    doc = allArticleDocuments;
  }

  const query = Array.isArray(req.query.q)
    ? req.query.q.join(" ")
    : req.query.q;

  const hits = await searchSanity(doc);

  if (hits.length === 0) {
    return res.status(200).json([]);
  }

  const result: SearchHit[] = getSearchResults(
    hits.map((x) => ({ ...x, content: x.content.replace(/\n|\r/g, " ") })),
    query
  ) as unknown as SearchHit[];

  const filteredResult: SearchHit[] = getSearchResults(
    hits
      .filter((x) => doc.includes(x._type))
      .map((x) => ({ ...x, content: x.content.replace(/\n|\r/g, " ") })),
    query
  ) as unknown as SearchHit[];

  const groupedHits: GroupedHits = filteredResult?.reduce(
    (prev, cur: SearchHit) => {
      if (cur.item._type in prev) {
        return { ...prev, [cur.item._type]: [...prev[cur.item._type], cur] };
      } else {
        return { ...prev, [cur.item._type]: [cur] };
      }
    },
    {}
  );

  const topResults = filteredResult.slice(0, 3).filter((x) => x.score < 0.1);

  const response: SearchResults = {
    groupedHits,
    topResults: filteredResult?.length > 8 ? topResults : [],
    totalHits: filteredResult?.length ?? 0,
    hits: {
      komponent_artikkel: result.filter(
        (x: any) => x.item._type === "komponent_artikkel"
      ).length,
      aksel_artikkel: result.filter(
        (x: any) => x.item._type === "aksel_artikkel"
      ).length,
      ds_artikkel: result.filter((x: any) => x.item._type === "ds_artikkel")
        .length,
      aksel_blogg: result.filter((x: any) => x.item._type === "aksel_blogg")
        .length,
      aksel_prinsipp: result.filter(
        (x: any) => x.item._type === "aksel_prinsipp"
      ).length,
    },
  };

  return res.status(200).json(response);
}

let data = null;

async function searchSanity(doctype: string[]) {
  if (!doctype) {
    return [];
  }

  if (data) {
    return data;
  }

  const sanityQuery = `*[_type in $types ]{
    ${akselArticleFields}
    "intro": pt::text(intro.body),
    "content": content,
  }`;

  data = await getClient()
    .fetch(sanityQuery, { types: allArticleDocuments })
    .then((res) => res.map((x) => ({ ...x, content: toPlainText(x?.content) })))
    .catch((err) => {
      console.log("Error message: ", err.message);
      return [];
    });

  return data;
}

function getSearchResults(results, query) {
  /* https://fusejs.io/api/options.html */
  const fuse = new Fuse<SearchHit>(results, {
    keys: [
      { name: "heading", weight: 100 },
      { name: "ingress", weight: 50 },
      { name: "intro", weight: 50 },
      { name: "content", weight: 10 },
      { name: "tema", weight: 20 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 4,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.2,
    distance: 6000,
  });
  return fuse.search(query).filter((x) => x.score < 0.3);
}

function toPlainText(blocks: any[]) {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}
