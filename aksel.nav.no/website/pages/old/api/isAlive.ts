import type { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({});
};
