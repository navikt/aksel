import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import fs from "fs";
import { JSDOM } from "jsdom";
import showdown from "showdown";
import { noCdnClient } from "../sanity/interface/client.server";

main();

async function main() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error("Missing token 'SANITY_WRITE' for updating changelog");
  }
  const client = noCdnClient(token);
  const changelog = fs.readFileSync("../../CHANGELOG.md", "utf-8");

  const converter = new showdown.Converter();
  converter.setOption("emoji", true);

  const html = converter.makeHtml(changelog);

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
    .fields.find((field) => field.name === "body").type;

  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlStr) => new JSDOM(htmlStr).window._document,
  });
  blocks.shift();

  client
    .patch("75351662-ecb0-455a-b9a5-59f319e423fa")
    .set({ content: blocks })
    .commit()
    .then(() => {
      console.info("Hurray, updated changelog!");
    })
    .catch((err) => {
      console.error("Oh no, the changelog-update failed: ", err.message);
    });
}
