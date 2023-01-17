import { noCdnClient } from "@/sanity-client";
import { format, isSameWeek } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

const token = process.env.SANITY_WRITE_KEY;

const client = noCdnClient(token);

export default async function logPageView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: "Missing required parameter(s). id",
    });
  }

  //check if document with id exists in sanity to prevent creating metrics for pages that don't exist
  const page = await client.fetch(`*[_id == "${id}"][0]`);

  if (!page) {
    return res.status(400).json({
      message: `Page with id: ${id} does not exist`,
    });
  }

  //check if metrics doucment with id exists in sanity
  const metrics = await client.fetch(
    `*[_type=="metrics" && references("${id}")][0]`
  );

  if (!metrics) {
    await client.create({
      _type: "metrics",
      reference: { _ref: id, _type: "reference" },
      pageviews: 1,
      weeksObj: {
        weeks: [
          {
            week: format(new Date(), "yyyy-MM-dd"),
            views: 1,
            _key: new Date().getTime().toString(),
          },
        ],
      },
      totalScrollLength: 0,
      avgTime: 0,
    });

    return res.status(200).json({ message: "Metrics created" });
  }

  await client
    .patch(metrics._id)
    .setIfMissing({ "weeksObj.weeks": [] })
    .setIfMissing({ pageviews: 0 })
    .inc({ pageviews: 1 })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  const { weeks } = metrics.weeksObj;

  if (weeks.length === 0) {
    // If weeks array is empty, add first week
    await client
      .patch(metrics._id)
      .prepend("weekObj.weeks", [
        {
          week: format(new Date(), "yyyy-MM-dd"),
          views: 1,
        },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      })
      .catch((err) => {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error updating page" });
      });
  } else {
    // If weeks array is not empty, compare last week
    const lastWeek = weeks[weeks.length - 1].week;
    if (isSameWeek(new Date(lastWeek), new Date())) {
      // If last week is same as current week, increment views
      await client
        .patch(metrics._id)
        .inc({ "weeksObj.weeks[0].views": 1 })
        .commit()
        .catch((err) => {
          console.error("Error:", err);
          return res
            .status(500)
            .json({ message: "Error updating current week" });
        });
    } else {
      // If last week is not same as current week, add new week
      await client
        .patch(metrics._id)
        .prepend("weekObj.weeks", [
          {
            week: format(new Date(), "yyyy-MM-dd"),
            views: 1,
          },
        ])
        .commit({
          autoGenerateArrayKeys: true,
        })
        .catch((err) => {
          console.error("Error:", err);
          return res.status(500).json({ message: "Error creating new week" });
        });
    }
  }

  return res.status(200).json({ message: `Metrics with id: ${id} updated.` });
}
