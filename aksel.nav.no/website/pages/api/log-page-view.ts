import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const client = getClient();

export default async function logPageView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  const query = `*[slug.current == "test-slug"][0]`;
  const page = await client
    .fetch(query, { slug })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Error updating page" });
    });

  return res.status(200).json(page);
}
