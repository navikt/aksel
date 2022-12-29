import { akselArticleFields } from "@/lib";
import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";
import { allArticleDocuments } from "../../../../sanity/config";
import Fuse from "fuse.js";

export const DocMap = {
  alle: allArticleDocuments,
  gp: ["aksel_artikkel"],
  komponenter: ["komponent_artikkel"],
  prinsipper: ["aksel_prinsipp"],
  grunnleggende: ["ds_artikkel"],
  blogg: ["aksel_blogg"],
};

const searchSanity = async (query: string, doctype: string[]) => {
  if (!query || !doctype) {
    return [];
  }

  const words = query
    .split(" ")
    .map(
      (x) => `heading match "*${x}*",
  heading match "${x}",
  pt::text(content) match "${x}",
  ingress match "*${x}*",
  pt::text(intro_komponent.body) match "*${x}*"`
    )
    .join(",");

  const catchAllQuery = `*${query}*`;

  const sanityQuery = `*[_type in $types ] | score(
    heading match $qAll,
    heading match $q,
    pt::text(content) match $q,
    ingress match $qAll,
    pt::text(intro_komponent.body) match $qAll,
    ${words}
  ){
     _score,
    ${akselArticleFields}
    "intro": pt::text(intro_komponent.body),
    "content": pt::text(content),
  }`;

  return await getClient()
    .fetch(sanityQuery, { types: doctype, q: query, qAll: catchAllQuery })
    .then((data) => {
      return data.filter((x) => x._score !== 0);
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return [];
    });
};

const getSearchResults = (results, query) => {
  /* https://fusejs.io/api/options.html */
  const fuse = new Fuse(results, {
    keys: [
      { name: "heading", weight: 100 },
      { name: "ingress", weight: 50 },
      { name: "intro", weight: 50 },
      { name: "content", weight: 20 },
      { name: "status.tag", weight: 10 },
      { name: "tema", weight: 20 },
    ],
    includeScore: true,
    threshold: 0.5,
    shouldSort: true,
    ignoreLocation: true,
    minMatchCharLength: 3,
    useExtendedSearch: true,
  });
  return fuse.search(query);
};

export default async function initialSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const doc =
    DocMap[
      Array.isArray(req.query.doc) ? req.query.doc.join("") : req.query.doc
    ];

  const query = Array.isArray(req.query.q)
    ? req.query.q.join(" ")
    : req.query.q;

  const hits = await searchSanity(query, doc);

  if (hits.length === 0) {
    return res.status(200).json([]);
  }

  const result = getSearchResults(hits, query);

  return res
    .status(200)
    .json(result.map((x) => ({ ...(x.item as any), _score: x.score })));
}
