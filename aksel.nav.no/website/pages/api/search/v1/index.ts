import { akselArticleFields } from "@/lib";
import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";
import { allArticleDocuments } from "../../../../sanity/config";

const DocMap = {
  alle: allArticleDocuments,
  gp: ["aksel_artikkel"],
  komponenter: ["komponent_artikkel"],
  prinsipper: ["aksel_prinsipp"],
  grunnleggende: ["ds_artikkel"],
  blogg: ["aksel_blogg"],
};

export default async function initialSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const kat =
    DocMap[
      Array.isArray(req.query.kat) ? req.query.kat.join(" ") : req.query.kat
    ];

  const query = Array.isArray(req.query.q)
    ? req.query.q.join(" ")
    : req.query.q;

  if (!kat) {
    return res.status(405).json({ message: "No valid category" });
  }
  if (!query) {
    return res.status(405).json({ message: "No valid query" });
  }

  const sanityQuery = `*[_type in $types && defined(publishedAt)] | order(publishedAt desc)[0...12] {
    ${akselArticleFields}
  }`;

  const payload = [];

  await getClient()
    .fetch(sanityQuery, { types: kat })
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
