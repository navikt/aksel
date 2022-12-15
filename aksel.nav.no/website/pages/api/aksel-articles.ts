import { akselArticleFields } from "@/lib";
import { getClient } from "@/sanity-client";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

export default async function akselAarticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const lastPublishedAt = req.query.lastPublishedAt;
  const lastId = req.query.lastId;

  if (!lastId || !lastPublishedAt) {
    return res
      .status(400)
      .json({ message: "Missing lastId or lstPublishedAt" });
  }

  const query = `{
      "articles": *[_type == "aksel_artikkel" && publishedAt != null && (publishedAt < "${format(
        new Date(String(lastPublishedAt)),
        "yyyy-MM-dd"
      )}" || publishedAt == "${format(
    new Date(String(lastPublishedAt)),
    "yyyy-MM-dd"
  )}")] | order(publishedAt desc)[0...20] {
          ${akselArticleFields}
        }
    }`;

  const { articles } = await getClient().fetch(query);

  if (!articles) {
    return res.status(500).json({ message: "Failed to load data" });
  }

  return res.status(200).json(articles);
}
