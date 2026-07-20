import fs from "node:fs";
import Sitemapper from "sitemapper";

const sitemap = new Sitemapper({
  timeout: 5000,
});

sitemap
  .fetch("https://aksel.nav.no/sitemap.xml")
  .then(({ sites }) => {
    fs.writeFileSync(
      "./e2e/sitemap-urls.json",
      JSON.stringify(sites.map((url) => new URL(url).pathname)),
    );
  })
  .catch((error) => {
    console.error(error);
    console.error("Failed generating urls for e2e tests");
  });
