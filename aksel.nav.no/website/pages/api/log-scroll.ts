import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageScroll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, length } = req.query;

  console.log(length);

  if (!id || !length) {
    return res.status(400).json({
      message: "Missing required parameter(s). id or length",
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
  const metrics = await client.fetch(
    `*[_type=="metrics" && references("${id}")][0]`
  );

  if (!metrics) {
    return res.status(400).json({
      message: `Metrics document with id: ${id} does not exist`,
    });
  }

  const { avgScrollLength, pageviews } = metrics;

  //calculate new average scroll length for each pageview based on previous average scroll length and new length
  const newAvgScrollLength =
    (avgScrollLength * (pageviews - 1) + Number(length)) / pageviews;

  await client
    .patch(metrics._id)
    .setIfMissing({ avgScrollLength: 0 })
    .set({ avgScrollLength: Math.round(newAvgScrollLength) })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating metrics" });
    });

  return res.status(200).json({ message: `Metrics with id: ${id} updated.` });
}
