import { akselArticleFields } from "@/lib";
import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";
import { allArticleDocuments } from "../../../../sanity/config";
import Fuse from "fuse.js";

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

  const result = getSearchResults(hits, query);

  return res.status(200).json(
    result.map((x) => ({
      item: x.item,
      score: x.score,
      matches: x.matches,
    }))
  );
}

async function searchSanity(doctype: string[]) {
  if (!doctype) {
    return [];
  }

  const sanityQuery = `*[_type in $types ]{
    ${akselArticleFields}
    "intro": pt::text(intro.body),
    "content": pt::text(content),
  }`;

  return await getClient()
    .fetch(sanityQuery, { types: doctype })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return [];
    });
}

function getSearchResults(results, query) {
  /* https://fusejs.io/api/options.html */
  const fuse = new Fuse(results, {
    keys: [
      { name: "heading", weight: 100 },
      { name: "ingress", weight: 50 },
      { name: "intro", weight: 50 },
      { name: "content", weight: 10 },
      { name: "tema", weight: 20 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 3,
    useExtendedSearch: false,
    includeMatches: true,
    ignoreLocation: false,
    threshold: 0.2,
    distance: 4000,
  });
  return fuse.search(query);
}
