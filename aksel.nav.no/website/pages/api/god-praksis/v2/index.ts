import { NextApiRequest, NextApiResponse } from "next";
import {
  GP_LAZYLOADED_ARTICLES,
  apiMainPageQuery,
  apiTemaPageQuery,
} from "@/layout/god-praksis-page/interface";
import { getClient } from "@/sanity/client.server";

export default async function gpArticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const page = Number(req.query.page);
  const innholdstype = req.query?.innholdstype?.toString?.() ?? "";
  const undertema = req.query?.undertema?.toString?.() ?? "";
  const tema = req.query?.tema?.toString?.() ?? "";

  if (!page && page !== 0) {
    return res
      .status(400)
      .json({ message: "Missing page param for pagination" });
  }

  let payload;

  await getClient()
    .fetch(tema.length > 0 ? apiTemaPageQuery : apiMainPageQuery, {
      start: page * GP_LAZYLOADED_ARTICLES,
      end: (page + 1) * GP_LAZYLOADED_ARTICLES,
      innholdstype,
      undertema,
      tema,
    })
    .then((data) => {
      payload = data.articles.articles;
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return res.status(500).json({ message: "Failed to load data" });
    });

  return res.status(200).json(payload);
}
