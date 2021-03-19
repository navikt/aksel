import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import pathsToTree from "../src/paths-to-tree";

const Page = () => {
  return <p>Hello!</p>;
};

export default Page;

export async function getStaticProps(context) {
  let tree = pathsToTree(
    glob.sync("data/**/*.mdx").filter((path) => !path.endsWith("index.mdx"))
  );

  const populateNode = (node, parentPath) => {
    let metadata;
    if (node.name.endsWith(".mdx")) {
      metadata = matter(fs.readFileSync(`${parentPath}${node.name}`, "utf8"))
        .data;
    } else {
      const indexPath = `${parentPath}${node.name}/index.mdx`;
      if (fs.existsSync(indexPath)) {
        metadata = matter(fs.readFileSync(indexPath, "utf8")).data;
      }
    }

    if (metadata) {
      if (metadata.title) {
        node.title = metadata.title;
      }
      if (metadata.rank) {
        node.rank = metadata.rank;
      }
    }

    if (node.children) {
      node.children.forEach((child) =>
        populateNode(child, `${parentPath}${node.name}/`)
      );
      node.children.sort((a, b) => a.rank - b.rank);
    } else {
      node.pathName = `${parentPath}${node.name}`.slice(5, -4);
    }
  };

  tree.forEach((node) => populateNode(node, ""));

  const menu = tree[0].children;

  return {
    props: {
      menu,
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
