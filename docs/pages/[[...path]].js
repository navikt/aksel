import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import tableOfContents from "../src/table-of-contents";
import mainMenu from "../src/main-menu";
import { Heading, Paragraph, Alert, Link } from "@navikt/ds-react";
import Bash from "../components/code/Bash";
import Import from "../components/code/Import";
import Preview from "../components/code-preview/Preview";
import Npm from "../components/npm/Npm";
import TableOfContents from "../components/table-of-contents/TableOfContents";
import KnappBase, { Knapp } from "nav-frontend-knapper";
import { Settings } from "@navikt/ds-icons";
/* import components, { mdxSource } from "../components/MDXComponents"; */
import renderToString from "next-mdx-remote/render-to-string";

const components = {
  h1: (props) => <Heading size="xxl" level={1} {...props} />,
  h2: (props) => <Heading size="large" level={2} {...props} />,
  h3: (props) => <Heading size="small" level={3} {...props} />,
  p: (props) => <Paragraph size="medium" {...props} />,
  Bash: Bash,
  Preview: Preview,
  Import: Import,
  Npm,
  TableOfContents,
  Alert,
  Link,
  Knapp: Knapp,
  Settings: Settings,
};

const Page = ({ mdxSource }) => hydrate(mdxSource, { components });

export default Page;

export async function getStaticProps({ params: { path } }) {
  const { content, data } = matter(
    fs.readFileSync(`data/${path?.join("/") || "index"}.mdx`, "utf8")
  );

  return {
    props: {
      mdxSource: await renderToString(content, {
        components,
        mdxOptions: {
          remarkPlugins: [require("remark-slug")],
        },
      }),
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
