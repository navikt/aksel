import { sitemapPages } from "@/sanity/interface";

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ path, lastmod }) => {
         return `
       <url>
           <loc>${`https://aksel.nav.no/${path}`}</loc>${
             lastmod ? `\n<lastmod>${`${lastmod.split("T")[0]}`}</lastmod>` : ""
           }
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

/* https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps */
export async function getServerSideProps({ res }) {
  const pages = await sitemapPages();

  const sitemap = generateSiteMap(pages);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
