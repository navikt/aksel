import { getClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const client = getClient();

export default async function logPageView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const query = `*[_id == $id][0]`;
  const page = await client
    .fetch(query, { id })
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
