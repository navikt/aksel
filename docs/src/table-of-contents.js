import markdown from "remark-parse";
import unified from "unified";

export default (content) =>
  unified()
    .use(markdown)
    .parse(content)
    .children.filter((x) => x.type === "heading")
    .filter((x) => x.depth === 2)
    .map((x) => x.children[0].value);
