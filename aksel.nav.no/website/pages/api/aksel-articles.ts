import { akselArticleAll } from "@/lib";
import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function akselAarticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log(req.query.key);
  if (req.query.key !== process.env.AKSEL_ARTICLES_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { articles } = await getClient().fetch(akselArticleAll);

  if (!articles) {
    return res.status(500).json({ message: "Failed to load data" });
  }

  return res.status(200).json({ message: "OK" });
}
