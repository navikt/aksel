import type { NextApiRequest, NextApiResponse } from "next";

export default function exit(_: NextApiRequest, res: NextApiResponse) {
  // Exit current user from preview mode
  res.clearPreviewData();

  // Redirect user back to the index page
  res.writeHead(307, { Location: "/" });
  res.end();
}
