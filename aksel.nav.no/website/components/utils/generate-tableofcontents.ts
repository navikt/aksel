import { allArticleDocuments } from "@/sanity/config";
import { TableOfContentsT } from "@/types";

type GeneralPageToc = {
  type: (typeof allArticleDocuments)[number];
  content: any[];
  intro?: boolean;
};

export function generateTableOfContents(
  input: GeneralPageToc
): TableOfContentsT {
  if (!input.content) {
    return [];
  }

  const _input = parsedContent(input.content);

  if (_input.length === 0) {
    return [];
  }

  const toc: TableOfContentsT = [];

  if (input.type === "komponent_artikkel" && input.intro) {
    toc.push({
      title: "Intro",
      id: "intro",
      children: [],
    });
  }

  let nested = false;
  let entry: TableOfContentsT[number] | null = null;

  _input.forEach((node) => {
    if (node.lvl === "h2") {
      if (nested) {
        toc.push(JSON.parse(JSON.stringify(entry)));
        entry = null;
        nested = false;
      }
      entry = {
        id: node.id,
        title: node.text,
        children: [],
      };
      nested = true;
    } else if (node.lvl === "h3") {
      if (!nested) {
        return;
      }
      entry.children = [
        ...entry.children,
        {
          id: node.id,
          title: node.text,
        },
      ];
    }
  });

  if (entry) {
    toc.push(entry);
  }

  return toc;
}

/**
 * Filters out unwanted nodes
 * @param content: Sanity blockcontent
 */
function parsedContent(content: any[]) {
  const _content: Array<{ id: string; lvl: "h2" | "h3"; text: string }> = [];

  content.forEach((node) => {
    if (
      ["h2", "h3"].includes(node?.style) &&
      node?.children?.[0]?.text &&
      node?._key
    ) {
      _content.push({
        id: node._key,
        lvl: node.style,
        text: node.children[0].text,
      });
    } else if (node?._type === "props_seksjon") {
      /* Nested elements in  props_seksjon are rendered as h3*/
      node?.komponenter.forEach((prop) => {
        if (prop?._key && prop?.title) {
          _content.push({
            id: prop._key,
            lvl: "h3",
            text: prop.title,
          });
        }
      });
    }
  });
  return _content;
}
