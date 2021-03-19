import GithubSlugger from "github-slugger";
import markdown from "remark-parse";
import unified from "unified";

export default (content) => {
  const slugger = new GithubSlugger();

  return unified()
    .use(markdown)
    .parse(content)
    .children.filter((node) => node.type === "heading")
    .filter((node) => node.depth === 2)
    .map((node) => node.children[0].value)
    .map((heading) => ({
      heading,
      slug: slugger.slug(heading),
    }));
};
