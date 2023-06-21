import { readFileSync, writeFileSync } from "node:fs";
import { List, ListItem, Root, Text } from "npm:@types/mdast";
import { Node } from "npm:@types/unist";
import { heading, root, text } from "npm:mdast-builder";
import remarkParse from "npm:remark-parse";
import remarkStringify from "npm:remark-stringify";
import { unified } from "npm:unified";
import { EXIT, SKIP, visit } from "npm:unist-util-visit";
import { visitParents } from "npm:unist-util-visit-parents";
import { getChangelogs } from "./utils.ts";

/**
 * Small diagram of the process:

           original 
        markdown files
               |
               V
          custom JSON 
        representation
         of changelog
               |
               V
        final markdown
 */

type PackageName = string;
type Version = string;
type RawASTNode = Node;
type SemverChangeHeading = Record<string, RawASTNode[]>;
type VersionEntry = Record<PackageName, SemverChangeHeading>;
type Changelog = Record<Version, VersionEntry>;

const upsertEntry = (
  changelog: Changelog,
  {
    lastSeenPackage,
    lastSeenVersion,
    lastSeenSemverHeading,
  }: {
    lastSeenPackage: string;
    lastSeenVersion: string;
    lastSeenSemverHeading: string;
  },
  value: RawASTNode
) => {
  changelog[lastSeenVersion] ??= {};
  changelog[lastSeenVersion][lastSeenPackage] ??= {};

  const raw_ast_nodes =
    changelog[lastSeenVersion][lastSeenPackage][lastSeenSemverHeading];

  changelog[lastSeenVersion][lastSeenPackage][lastSeenSemverHeading] =
    raw_ast_nodes ? [...raw_ast_nodes, value] : [value];

  const updatedVersion = changelog[lastSeenVersion] || [];
  changelog[lastSeenVersion] = updatedVersion;
};

const parseMarkdownFiles = async (filePaths: string[]): Promise<Changelog> => {
  const changelog: Changelog = {};

  for (const filePath of filePaths) {
    const fileContent = readFileSync(filePath, { encoding: "utf-8" });
    const fileAST = await unified().use(remarkParse).parse(fileContent);

    console.log(JSON.stringify(fileAST, null, 2));

    // TODO is there a _better_ way? This seems cluttered and hard to reason about
    let lastSeenPackage = "";
    let lastSeenVersion = "";
    let lastSeenSemverHeading = "";

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
          (ancestor) => ancestor.type === "list"
        );
        const parent = ancestors[listIndex] as List;

        // we traversed up from child match to parent
        // so we need to traverse down from parent to child
        // again to find index of child within parent... yeah 😂
        const indexWithinList = parent.children.findIndex((child: ListItem) => {
          return child.children.some((grandchild) => {
            let found = false;
            visit(grandchild, (node) => {
              if (
                node.type === "text" &&
                node.value.startsWith("Updated dependencies")
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
        if (parent && index !== null) {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
    });

    ///////////////////
    // upsert into custom JS object
    ///////////////////

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
          lastSeenSemverHeading = childNode.value;
        }
      } else {
        upsertEntry(
          changelog,
          { lastSeenPackage, lastSeenVersion, lastSeenSemverHeading },
          structuredClone(node)
        );
      }
      return SKIP;
    });
  }
  return changelog;
};

const createMainChangelog = async (changelog: Changelog): Promise<string> => {
  const headings = [];
  Object.entries(changelog).forEach(([version, versionEntry]) => {
    headings.push(heading(2, [text(version)]));
    for (const [packageName, logGrouping] of Object.entries(versionEntry)) {
      headings.push(heading(3, [text(packageName)]));
      for (const [semverHeading, changes] of Object.entries(logGrouping)) {
        headings.push(heading(4, [text(semverHeading)]));
        for (const raw_ast_nodes of changes) {
          headings.push(raw_ast_nodes);
        }
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

const changelogFiles = getChangelogs("./@navikt");
console.log("processing the following markdown files:", changelogFiles);
const changelogJSON = await parseMarkdownFiles(changelogFiles);
const changelog = await createMainChangelog(changelogJSON);
writeFileSync("CHANGELOG.md", changelog);
console.log("wrote to CHANGELOG.md");
