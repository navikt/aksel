import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/sanity/client.server";

export default async function gpAarticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const page = Number(req.query.page);

  if (!page) {
    return res
      .status(400)
      .json({ message: "Missing page param for pagination" });
  }

  const query = `{
    "articles": *[_type == "aksel_artikkel" && defined(undertema)][$start...$end] | order(publishedAt desc){
      heading,
      ingress ,
      "undertema": undertema[]->title,
      "innholdstype": innholdstype->title,
      "slug": slug.current
    },
    "completed": count(*[_type == "aksel_artikkel" && defined(undertema)]) <= $end
    }`;

  let payload;

  await getClient()
    .fetch(query, { start: page * 9, end: (page + 1) * 9 })
    .then((data) => {
      payload = data;
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return res.status(500).json({ message: "Failed to load data" });
    });
  console.log(payload);

  return res.status(200).json(payload);
}
