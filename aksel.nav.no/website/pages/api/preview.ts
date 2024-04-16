import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "next-sanity";
import { clientConfig } from "../../sanity/config";

const previewClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_PREVIEW_TOKEN,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
});

function redirectToPreview(res: NextApiResponse, Location: string) {
  // Enable preview mode by setting the cookies
  res.setPreviewData({});

  // Redirect to a preview capable route
  res.writeHead(307, { Location });
  res.end();
}

const landingPages = [
  "komponenter",
  "grunnleggende",
  "god-praksis",
  "produktbloggen",
  "prinsipper",
  "monster-maler",
  "gp",
];

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query;

  if ((!slug && slug !== ":slug*") || slug instanceof Array) {
    return redirectToPreview(res, "/");
  }

  if (!process.env.SANITY_PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid preview-token" });
  }

  if (slug === ":slug*") {
    return redirectToPreview(res, `/`);
  }

  const isLanding = landingPages.find((x) => x === slug);

  if (isLanding) {
    return redirectToPreview(res, `/${isLanding}`);
  }

  // Check if the article with the given `slug` exists
  const { article, godpraksis } = await previewClient.fetch(
    `{
      "article": *[slug.current == $slug][0].slug.current,
      "godpraksis": *[slug.current == $godpraksis && _type == "gp.tema"][0].slug.current
      }`,
    {
      slug,
      godpraksis: slug.replace("god-praksis/", ""),
    },
  );

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!article && !godpraksis) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  if (article) {
    return redirectToPreview(res, `/${article}`);
  } else if (godpraksis) {
    return redirectToPreview(res, `/god-praksis/${godpraksis}`);
  }

  // Redirect to the path from the fetched article
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
}
