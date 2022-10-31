import { previewClient } from "@/sanity-client";

function redirectToPreview(res, Location) {
  // Enable preview mode by setting the cookies
  res.setPreviewData({});

  // Redirect to a preview capable route
  res.writeHead(307, { Location });
  res.end();
}

export default async function preview(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return redirectToPreview(res, "/");
  }

  // Check if the article with the given `slug` exists
  const article = await previewClient.fetch(
    "*[slug.current == $slug][0].slug.current",
    {
      slug,
    }
  );

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!article) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Redirect to the path from the fetched article
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return redirectToPreview(res, `/${article}`);
}
