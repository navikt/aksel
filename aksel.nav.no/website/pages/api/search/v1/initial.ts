import { akselArticleFields } from "@/lib";
import { DocMap } from "./index";
import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";
import { allArticleDocuments } from "../../../../sanity/config";

/*
TODO: nyeste artikler basert på kategori (alle, god praksis, komponenter etc)
*/
export default async function initialSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const query = `*[_type in $types && defined(publishedAt)] | order(publishedAt desc)[0...12] {
    ${akselArticleFields}
  }`;

  const doc =
    DocMap[
      Array.isArray(req.query.doc) ? req.query.doc.join("") : req.query.doc
    ] ?? allArticleDocuments;

  const payload = [];

  await getClient()
    .fetch(query, { types: doc })
    .then((data) => {
      payload.push(...data);
      return data;
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return res.status(500).json({ message: "Failed to load data" });
    });

  return res.status(200).json(payload);
}

/*

*[_type in [
  "aksel_artikkel",
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
]] | score(
  boost(heading match $term2, 7),
  boost(heading match $term, 10),
  boost(pt::text(content) match $term, 2),
  boost(ingress match $term2, 2),
  boost(pt::text(intro_komponent.body) match $term2, 3)
) [0...10]{heading, _score}
*/
