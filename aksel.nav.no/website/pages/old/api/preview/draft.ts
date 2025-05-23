import { validatePreviewUrl } from "@sanity/preview-url-secret";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "next-sanity";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "@/sanity/config";

const token = process.env.SANITY_READ;

if (!token) {
  throw new Error(
    "A secret is provided but there is no `SANITY_READ` environment variable setup.",
  );
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token,
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  if (!req.url) {
    throw new Error("Missing url");
  }
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client,
    req.url,
  );
  if (!isValid) {
    return res.status(401).send("Invalid secret");
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
