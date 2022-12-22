import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageScroll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, current, views, length } = req.query;

  if (!(id && current && views)) {
    return res
      .status(400)
      .json({ message: "Missing required parameter(s). id, current or views" });
  }

  const newAverage = Math.round(
    (Number(length) + Number(current)) / Number(views)
  );

  // If page is new, create metrics object
  await client
    .patch(id as string)
    .setIfMissing({ "metrics.avgScrollLength": 0 })
    .set({ "metrics.avgScrollLength": newAverage })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
