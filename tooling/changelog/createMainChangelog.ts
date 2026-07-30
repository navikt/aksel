import type {
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  Root,
  Text,
} from "mdast";
import { heading, root, text } from "mdast-builder";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { Node } from "unist";
import { CONTINUE, EXIT, SKIP, visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import { getChangelogs } from "./utils.js";

type PackageName = string;
type Version = string;
type VersionEntry = Record<PackageName, Node[]>;
type Changelog = Record<Version, VersionEntry>;

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const upsertEntry = (
  changelog: Changelog,
  {
    lastSeenPackage,
    lastSeenVersion,
  }: {
    lastSeenPackage: string;
    lastSeenVersion: string;
  },
  value: Node,
) => {
  changelog[lastSeenVersion] ??= {};

  const raw_ast_nodes = changelog[lastSeenVersion][lastSeenPackage];

  changelog[lastSeenVersion][lastSeenPackage] = raw_ast_nodes
    ? [...raw_ast_nodes, value]
    : [value];

  const updatedVersion = changelog[lastSeenVersion] || [];
  changelog[lastSeenVersion] = updatedVersion;
};

const processNode = (node: Root) => {
  visitParents(node, (childNode, ancestors) => {
    if (childNode.type === "text" && childNode.value.startsWith("! -")) {
      const parent = ancestors.findLast(
        (ancestor) => ancestor.type === "paragraph",
      ) as Paragraph;
      visit(parent, (node2, index, parent2) => {
        if (
          node2.type === "link" ||
          (node2.type === "text" && node2.value === " Thanks ")
        ) {
          if (parent2 && index !== undefined) {
            parent2.children.splice(index, 1);
            return [CONTINUE, index];
          }
        }
        if (node2.type === "text" && node2.value.startsWith("! -")) {
          node2.value = node2.value.replace(/! (- )+/, "");
          return;
        }
      });
      parent.children.push(text(" ") as PhrasingContent);
    }
  });
};

const parseMarkdownFiles = async (filePaths: string[]): Promise<Changelog> => {
  const changelog: Changelog = {};

  for (const filePath of filePaths) {
    const fileContent = readFileSync(filePath, { encoding: "utf-8" });
    const fileAST = await unified().use(remarkParse).parse(fileContent);

    ///////////////////
    // filtering passes
    ///////////////////

    // filter out all the 'Updated dependencies' nodes (at their relevant parent)
    visitParents(fileAST, "paragraph", (node, ancestors) => {
      if (
        node.children[0].type === "text" &&
        node.children[0].value.startsWith("Updated dependencies")
      ) {
        const listIndex = ancestors.findLastIndex(
          (ancestor) => ancestor.type === "list",
        );
        const parent = ancestors[listIndex] as List;

        // we traversed up from child match to parent
        // so we need to traverse down from parent to child
        // again to find index of child within parent... yeah 😂
        const indexWithinList = parent.children.findIndex((child: ListItem) => {
          return child.children.some((grandchild) => {
            let found = false;
            visit(grandchild, (node2) => {
              if (
                node2.type === "text" &&
                node2.value.startsWith("Updated dependencies")
              ) {
                found = true;
                return EXIT;
              }
            });
            return found;
          });
        });
        if (parent && indexWithinList !== -1) {
          parent.children.splice(indexWithinList, 1);
          return [SKIP, indexWithinList];
        }
      }
    });

    // filter all empty list nodes
    visit(fileAST, (node, index, parent) => {
      if (node.type === "list" && node.children.length === 0) {
        if (parent && index !== undefined) {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
    });

    ///////////////////
    // upsert into custom JS object
    ///////////////////

    let lastSeenPackage = "";
    let lastSeenVersion = "";

    visit(fileAST, (node) => {
      if (node.type === "root") {
        return;
      }
      if (node.type === "heading" && node.depth === 1) {
        const childNode = node.children[0] as Text | undefined;
        if (childNode && childNode.type === "text") {
          const packageName = childNode.value;
          if (packageName.startsWith("@navikt/")) {
            lastSeenPackage = packageName;
          }
        }
      } else if (node.type === "heading" && node.depth === 2) {
        const childNode = node.children[0] as Text | undefined;
        if (childNode && childNode.type === "text") {
          const version = childNode.value;
          if (version.match(/^\d+\.\d+\.\d+$/)) {
            lastSeenVersion = version;
          }
        }
      } else if (node.type === "heading" && node.depth === 3) {
        const childNode = node.children[0] as Text | undefined;
        if (childNode && childNode.type === "text") {
          // ignore semver heading ('Major', 'Minor', 'Patch')
        }
      } else {
        upsertEntry(
          changelog,
          { lastSeenPackage, lastSeenVersion },
          structuredClone(node),
        );
      }
      return SKIP;
    });
  }
  return changelog;
};

const semverSort = (a: string, b: string): number => {
  const [aMajor, aMinor, aPatch] = a.split(".").map((v) => parseInt(v, 10));
  const [bMajor, bMinor, bPatch] = b.split(".").map((v) => parseInt(v, 10));

  if (aMajor !== bMajor) {
    return aMajor - bMajor;
  }

  if (aMinor !== bMinor) {
    return aMinor - bMinor;
  }

  return aPatch - bPatch;
};

const createMainChangelog = async (changelog: Changelog): Promise<string> => {
  const headings = [];
  Object.entries(changelog)
    .sort((a, b) => semverSort(a[0], b[0]))
    .reverse()
    .forEach(([version, versionEntry]) => {
      headings.push(heading(2, [text(version)]));
      for (const [packageName, changes] of Object.entries(versionEntry)) {
        headings.push(heading(3, [text(packageName)]));
        for (const change of changes) {
          processNode(change as Root);
          headings.push(change);
        }
      }
    });

  headings.unshift(heading(1, [text("Changelog")]));

  const changelog_node_tree = root(headings) as Root;
  const processed = await unified()
    .use(remarkStringify, { bullet: "-" })
    .stringify(changelog_node_tree);

  return processed;
};

const changelogFiles = getChangelogs(resolve(repoRoot, "@navikt"));
console.info("Processing the following markdown files:", changelogFiles);
const changelogJSON = await parseMarkdownFiles(changelogFiles);
const changelogStr = await createMainChangelog(changelogJSON);
writeFileSync(resolve(repoRoot, "CHANGELOG.md"), changelogStr);
console.info("Wrote to CHANGELOG.md");
