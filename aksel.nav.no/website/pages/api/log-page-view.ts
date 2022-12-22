import { noCdnClient } from "@/sanity-client";
import { isSameWeek } from "date-fns";
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

  // If page is new, create metrics object
  await client
    .patch(id as string)
    .setIfMissing({ "metrics.pageviews.weeks": [] })
    .setIfMissing({ "metrics.pageviews.summary": 0 })
    .inc({ "metrics.pageviews.summary": 1 })
    .commit()
    .catch((err) => {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error updating page" });
    });

  const query = `*[_id == $id][0]{
    "weeks": metrics.pageviews.weeks,
  }`;

  // Fetch page weeks array to compare
  const { weeks } = await client
    .fetch(query, { id })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Error fetching weeks" });
    });

  if (weeks.length === 0) {
    // If weeks array is empty, add first week
    await client
      .patch(id as string)
      .prepend("metrics.pageviews.weeks", [
        {
          week: new Date().toISOString(),
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
        .patch(id as string)
        .inc({ "metrics.pageviews.weeks[0].views": 1 })
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
        .patch(id as string)
        .prepend("metrics.pageviews.weeks", [
          {
            week: new Date().toISOString(),
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
