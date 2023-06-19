import { noCdnClient } from "@/sanity/client.server";
import { logger } from "logger";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageScroll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, length } = req.query;

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

  const { avgScrollLength, pageviews, weeksObj } = metrics;

  const currrentWeek = weeksObj.weeks[0];

  await client
    .patch(metrics._id)
    .setIfMissing({ avgScrollLength: 0 })
    .set({
      avgScrollLength: calcNewAverage(
        avgScrollLength,
        pageviews,
        Number(length)
      ),
    })
    .set({
      "weeksObj.weeks[0].scrollLength": calcNewAverage(
        currrentWeek.scrollLength,
        currrentWeek.views,
        Number(length)
      ),
    })
    .commit()
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: "Error updating metrics" });
    });

  return res.status(200).json({ message: `Metrics with id: ${id} updated.` });
}

export const calcNewAverage = (
  oldAverage: number,
  occurances: number,
  newValue: number
): number => {
  if (oldAverage === 0 || oldAverage === null) {
    return Math.round(newValue / occurances);
  }
  return Math.round((oldAverage * (occurances - 1) + newValue) / occurances);
};
