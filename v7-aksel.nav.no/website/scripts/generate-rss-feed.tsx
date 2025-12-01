import fs from "node:fs";
import path from "node:path";
import RSS from "rss";
import { noCdnClient } from "../sanity/interface/client.server";

generateRssFeed();

async function generateRssFeed() {
  const site_url = "https://aksel.nav.no";
  const rss_path = "produktbloggen-rss.xml";
  const rss_dir = "public/rss";

  const query = `*[_type == "aksel_blogg"] | order(publishedAt desc) {
    heading,
    ingress,
    publishedAt,
    _id,
    "slug": slug.current,
  }`;

  const token = process.env.SANITY_READ_NO_DRAFTS;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_READ_NO_DRAFTS' when updating RSS-feed",
    );
  }
  const bloggposts = await noCdnClient(token).fetch(query);

  const feedOptions = {
    title: "Produktbloggen - aksel.nav.no",
    site_url,
    feed_url: `${site_url}/rss/${rss_path}`,
    pubDate: new Date(),
  };

  const feed = new RSS(feedOptions);

  bloggposts.forEach((post) => {
    feed.item({
      title: post.heading,
      description: post.ingress,
      url: `${site_url}/${post.slug}`,
      date: post.publishedAt,
    });
  });

  const rssPath = path.resolve(process.cwd(), rss_dir);

  if (!fs.existsSync(rssPath)) {
    fs.mkdirSync(rssPath);
  }

  fs.writeFileSync(`${rssPath}/${rss_path}`, feed.xml({ indent: true }));
}
