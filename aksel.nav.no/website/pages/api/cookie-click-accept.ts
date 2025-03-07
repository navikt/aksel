import type { NextApiRequest, NextApiResponse } from "next";
import { createChildLogger } from "@navikt/next-logger";
import { noCdnClient } from "@/sanity/client.server";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const logger = createChildLogger("cookie-banner");

  const token = process.env.SANITY_WRITE;
  if (!token) {
    logger.error("No token found for API request");

    return res.status(200).end();
  }

  try {
    await noCdnClient(token)
      .patch("cookie_tracker")
      .inc({ total: 1, accept: 1 })
      .commit();

    return res.status(200).end();
  } catch {
    logger.error("Cookie tracker document patch failed");
    return res.status(200).end();
  }
}
