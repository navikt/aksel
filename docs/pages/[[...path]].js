import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import components from "../components/layout/MDXComponents";
import tableOfContents from "../src/table-of-contents";
import mainMenu from "../src/main-menu";

const Page = ({ mdxSource }) => hydrate(mdxSource, { components });

export default Page;

export async function getStaticProps({ params: { path } }) {
  const { content } = matter(
    fs.readFileSync(`data/${path?.join("/") || "index"}.mdx`, "utf8")
  );

  return {
    props: {
      mdxSource: await renderToString(content, { components }),
      menu: mainMenu(),
      tableOfContents: tableOfContents(content),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: [] } },
      ...glob
        .sync("data/**/*.mdx")
        .filter((path) => !path.endsWith("index.mdx"))
        .map((path) => path.slice(5, -4).split("/"))
        .map((path) => ({ params: { path } })),
    ],
    fallback: false,
  };
}
