import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  await client
    .patch(id as string)
    .setIfMissing({ "metrics.pageviews.summary": 0 })
    .inc({ "metrics.pageviews.summary": 1 })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  // const query = `*[_id == $id][0]`;
  // const page = await client
  //   .fetch(query, { id })
  //   .then((res) => {
  //     console.log(res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return res.status(500).json({ message: "Error updating page" });
  //   });

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
