import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import pathsToTree from "../src/paths-to-tree";

export default () => {
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
      node.title = "DEFAULT-TITLE";
      node.rank = 9999;
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
      node.pathName = `/${parentPath}${node.name}`.slice(5, -4);
    }
  };

  tree.forEach((node) => populateNode(node, ""));

  return tree[0].children;
};
