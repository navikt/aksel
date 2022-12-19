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

  let lastPublishedAt = req.query.lastPublishedAt;

  if (!lastPublishedAt) {
    return res
      .status(400)
      .json({ message: "Missing lastId or lstPublishedAt" });
  }

  lastPublishedAt = format(new Date(String(lastPublishedAt)), "yyyy-MM-dd");

  const query = `{
    "publishDateArticles": *[_type == "aksel_artikkel"  && defined(publishedAt) && publishedAt <= "${lastPublishedAt}"] | order(publishedAt desc) {
          ${akselArticleFields}
        },
    "noPublishDateArticles": *[_type == "aksel_artikkel" && !defined(publishedAt)] | order(_updatedAt desc){
          ${akselArticleFields}
        }
    }`;

  let payload = [];

  await getClient()
    .fetch(query)
    .then((data) => {
      payload = [...data.publishDateArticles, ...data.noPublishDateArticles];
      return data;
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return res.status(500).json({ message: "Failed to load data" });
    });

  return res.status(200).json(payload);
}
