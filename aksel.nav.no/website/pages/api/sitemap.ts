import { sitemapPages } from "@/sanity/interface";
import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";

/* https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    const pages = await sitemapPages();

    // Create each URL row
    pages.forEach((post) => {
      smStream.write({
        url: `/${post.path}`,
        changefreq: "monthly",
        lastmod: post.lastmod,
      });
    });

    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
  }
};
