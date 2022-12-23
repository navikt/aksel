import { NextApiRequest, NextApiResponse } from "next";

export default async function logTime(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, current, views, time } = req.query;

  if (!(id && current && views && time)) {
    return res
      .status(400)
      .json({
        message: "Missing required parameter(s). id, current, length or views",
      });
  }

  return res.status(200).json({ message: `Page with id: ${id} updated.` });
}
