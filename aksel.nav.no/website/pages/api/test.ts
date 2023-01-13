import { noCdnClient } from "@/sanity-client";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  //if no id is provided, return error
  if (!id) {
    return res.status(400).json({
      message: "Missing required parameter(s). id",
    });
  }

  //check if doucment with id exists in sanity
  const metrics = await client.fetch(`*[_id == "metrics-${id}"][0]`);

  //If no metrics document exists, create one
  if (!metrics) {
    await client.create({
      _id: `metrics-${id}`,
      _type: "metrics",
      pageviews: {
        summary: 0,
        weeks: [],
      },
      avgScrollLength: 0,
      avgTime: 0,
    });
  }

  return res.status(200).json({ message: "Test endpoint" });
}
