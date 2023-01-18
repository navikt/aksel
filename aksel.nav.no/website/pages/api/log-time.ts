import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logTime(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, time } = req.query;

  if (!(id && time)) {
    return res.status(400).json({
      message: "Missing required parameter(s). id or time",
    });
  }

  const metrics = await client.fetch(
    `*[_type=="metrics" && references("${id}")][0]`
  );

  if (!metrics) {
    return res.status(400).json({
      message: `Metrics document with id: ${id} does not exist`,
    });
  }

  //const { avgTime, pageviews } = metrics;

  const newAverage = 5;

  await client
    .patch(metrics._id)
    .setIfMissing({ "metrics.avgTime": 0 })
    .set({ "metrics.avgTime": newAverage })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
