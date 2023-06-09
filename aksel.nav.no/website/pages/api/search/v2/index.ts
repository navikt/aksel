import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { logger } from "logger";

export default async function searchApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const result = await fetchSanityData();
  return res.status(200).json(result);
}

async function fetchSanityData(): Promise<any[]> {
  try {
    return JSON.parse(
      fs.readFileSync("./searchindex.json", {
        encoding: "utf-8",
      })
    );
  } catch (error) {
    logger.error("No searchindex.json found");
    return [];
  }
}
