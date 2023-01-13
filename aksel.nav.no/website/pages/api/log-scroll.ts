import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageScroll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, length } = req.query;

  if (!id) {
    return res.status(400).json({
      message: "Missing required parameter(s). id",
    });
  }

  //check if document with id exists in sanity to prevent creating metrics for pages that don't exist
  const page = await client.fetch(`*[_id == "${id}"][0]`);

  if (!page) {
    return res.status(400).json({
      message: `Document with id: ${id} does not exist`,
    });
  }

  //check if metrics doucment with id exists in sanity
  const metrics = await client
    .fetch(`*[_id == "metrics-${id}"][0]`)
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error fetching metrics" });
    });

  const { avgScrollLength, pageviews } = metrics;

  const newAverage = Math.round(
    (Number(length) + Number(avgScrollLength || 0)) /
      Number(pageviews.summary || 1)
  );

  await client
    .patch(`metrics-${id}`)
    .setIfMissing({ avgScrollLength: 0 })
    .set({ avgScrollLength: newAverage })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating metrics" });
    });

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
