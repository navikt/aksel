import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";
import { calcNewAverage } from "./log-scroll";

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

  const { avgTime, pageviews, weeksObj } = metrics;

  const currrentWeek = weeksObj.weeks[0];

  const newAverage = calcNewAverage(avgTime, pageviews, Number(time));

  await client
    .patch(metrics._id)
    .setIfMissing({ avgTime: 0 })
    .set({ avgTime: newAverage })
    .set({
      "weeksObj.weeks[0].time": calcNewAverage(
        currrentWeek.time,
        currrentWeek.views,
        Number(time)
      ),
    })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
