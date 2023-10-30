import RSS from "rss";
import fs from "fs";

export default async function generateRssFeed(bloggposts) {
  const site_url = "https://aksel.nav.no/";
  const path = "produktbloggen";

  const feedOptions = {
    title: "Produktbloggen - aksel.nav.no",
    site_url,
    feed_url: `${site_url}/rss.xml`,
    pubDate: new Date(),
  };

  const feed = new RSS(feedOptions);

  bloggposts.forEach((post) => {
    feed.item({
      title: post.heading,
      description: post.ingress,
      url: `${site_url}/${path}/${post.slug}`,
      date: post.publishedAt,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
