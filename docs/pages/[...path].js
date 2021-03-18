import fs from "fs";
import glob from "glob";
import matter from "gray-matter";

export default ({ menu }) => {
  console.log(menu);

  return <p>Hello!</p>;
};

export async function getStaticProps(context) {
  return {
    props: {
      menu: glob.sync("data/**/*.mdx").map((path) => ({
        path: path.replace(".mdx", "").replace("data/", ""),
        title: matter(fs.readFileSync(path, "utf8")).data.title,
      })),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: glob
      .sync("data/**/*.mdx")
      .map((path) => path.replace(".mdx", "").split("/").slice(1))
      .map((path) => ({ params: { path } })),
    fallback: false,
  };
}
