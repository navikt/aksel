import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import fs from "node:fs";
import showdown from "showdown";
import { noCdnClient } from "../sanity/interface/client.server";

main();

async function main() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error("Missing token 'SANITY_WRITE' for updating changelog");
  }
  const client = noCdnClient(token);
  const changelog = fs
    .readFileSync("../../CHANGELOG.md", "utf-8")
    .split("\n## ");
  changelog.shift(); // Remove the first item, it's the main heading.

  const converter = new showdown.Converter();
  converter.setOption("emoji", true);

  const defaultSchema = Schema.compile({
    name: "test",
    types: [
      {
        type: "object",
        name: "blogPost",
        fields: [
          {
            title: "Body",
            name: "body",
            type: "array",
            of: [{ type: "block" }],
          },
        ],
      },
    ],
  });

  const blockContentType = defaultSchema
    .get("blogPost")
    .fields.find((field: any) => field.name === "body").type;

  // We go through the last 3 entries in case there has been changes,
  // or in case previous attempts have failed.
  for (let i = 2; i >= 0; i--) {
    const currentChangelogEntry = changelog[i];
    const version = currentChangelogEntry.substring(
      0,
      currentChangelogEntry.indexOf("\n"),
    );
    const text = currentChangelogEntry
      .substring(currentChangelogEntry.indexOf("\n") + 1)
      .replace(/### /g, "## "); // Bump package names down to h2
    const heading = `Versjon ${version}`;
    const blocks = htmlToBlocks(converter.makeHtml(text), blockContentType, {
      parseHtml: (htmlStr) => new JSDOM(htmlStr).window._document,
    });
    const slug = `versjon-${version}`;

    // Check for existing document
    const existingDoc = await client.fetch(
      `*[_type == "ds_endringslogg_artikkel" && slug.current == $slug]`,
      { slug },
      { perspective: "published" },
    );
    if (existingDoc.length > 1) {
      throw new Error(
        `Found multiple documents with the same slug (${slug}), don't know which one to update 😵‍💫`,
      );
    }

    if (existingDoc.length === 0) {
      // Create new document
      await client
        .create({
          _id: `auto-endringslogg-kode-${version}`,
          _type: "ds_endringslogg_artikkel",
          heading,
          slug: {
            _type: "slug",
            current: slug,
          },
          endringsdato: new Date(),
          endringstype: "kode",
          content: blocks,
        })
        .then(() => {
          console.info("Created new changelog doc for version", version);
        })
        .catch((err) => {
          console.error("Oh no, the changelog-update failed: ", err.message);
        });
    } else {
      // Update existing document
      await client
        .patch(existingDoc[0]._id)
        .set({ content: blocks })
        .commit()
        .then(() => {
          console.info("Updated changelog doc for version", version);
        })
        .catch((err) => {
          console.error("Oh no, the changelog-update failed: ", err.message);
        });
    }
  }
}
