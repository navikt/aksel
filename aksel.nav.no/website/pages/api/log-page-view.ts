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

  //check if doucment with id exists in sanity
  const metrics = await client.fetch(`*[_id == "metrics-${id}"][0]`);

  if (!metrics) {
    await client.create({
      _id: `metrics-${id}`,
      _type: "metrics",
      referenceId: id,
      pageviews: {
        summary: 1,
        weeks: [
          {
            week: format(new Date(), "yyyy-MM-dd"),
            views: 1,
            _key: new Date().getTime().toString(),
          },
        ],
      },
      avgScrollLength: 0,
      avgTime: 0,
    });

    return res.status(200).json({ message: "Metrics created" });
  }

  await client
    .patch(`metrics-${id}`)
    .setIfMissing({ "pageviews.weeks": [] })
    .setIfMissing({ "pageviews.summary": 0 })
    .inc({ "pageviews.summary": 1 })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  const query = `*[_id == "metrics-${id}"][0]{
    "weeks": pageviews.weeks,
  }`;

  // Fetch page weeks array to compare
  const { weeks } = await client
    .fetch(query)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Error fetching weeks" });
    });

  if (weeks.length === 0) {
    // If weeks array is empty, add first week
    await client
      .patch(`metrics-${id}`)
      .prepend("pageviews.weeks", [
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
        .patch(`metrics-${id}`)
        .inc({ "pageviews.weeks[0].views": 1 })
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
        .patch(`metrics-${id}`)
        .prepend("pageviews.weeks", [
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

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
