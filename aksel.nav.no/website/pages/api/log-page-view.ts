import { NextApiRequest, NextApiResponse } from "next";

export default async function logPageView(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ message: "Page view +1" });
}
