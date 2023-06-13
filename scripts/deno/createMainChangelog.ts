import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { Root } from "npm:@types/mdast";
import { heading, root, text } from "npm:mdast-builder";
import remarkParse from "npm:remark-parse";
import remarkStringify from "npm:remark-stringify";
import { unified } from "npm:unified";
import { SKIP } from "npm:unist-util-visit";
import { visitParents } from "npm:unist-util-visit-parents";

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
type LogGrouping = Partial<Record<string, string[]>>;
type VersionEntry = Record<PackageName, LogGrouping>;
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
  value: string
) => {
  if (!changelog[lastSeenVersion]) {
    changelog[lastSeenVersion] = {};
  }
  if (!changelog[lastSeenVersion][lastSeenPackage]) {
    changelog[lastSeenVersion][lastSeenPackage] = {};
  }
  const semverHeading =
    changelog[lastSeenVersion][lastSeenPackage][lastSeenSemverHeading];
  if (!semverHeading) {
    changelog[lastSeenVersion][lastSeenPackage][lastSeenSemverHeading] = [
      value,
    ];
  } else {
    semverHeading.push(value);
  }

  const updatedVersion = changelog[lastSeenVersion] || [];
  changelog[lastSeenVersion] = updatedVersion;
};

const parseMarkdownFiles = async (filePaths: string[]): Promise<Changelog> => {
  const changelog: Changelog = {};

  for (const filePath of filePaths) {
    const fileContent = readFileSync(filePath, { encoding: "utf-8" });
    const result = await unified().use(remarkParse).parse(fileContent);

    // console.log(JSON.stringify(result, null, 2)); // DEBUG (show the AST)

    // TODO is there a _better_ way? This seems cluttered and hard to reason about
    let lastSeenPackage = "";
    let lastSeenVersion = "";
    let lastSeenSemverHeading = "";

    visitParents(result, (node, ancestors) => {
      if (node.type === "root") {
        return;
      }
      if (node.type === "heading" && node.depth === 1) {
        //@ts-ignore
        const packageName = node.children[0].value;
        if (packageName.startsWith("@navikt/")) {
          lastSeenPackage = packageName;
        }
        return SKIP;
      } else if (node.type === "heading" && node.depth === 2) {
        //@ts-ignore
        const version = node.children[0].value;
        if (version.match(/^\d+\.\d+\.\d+$/)) {
          lastSeenVersion = version;
        }
        return SKIP;
      } else if (node.type === "heading" && node.depth === 3) {
        //@ts-ignore
        lastSeenSemverHeading = node.children[0].value;
        return SKIP;
      } else {
        upsertEntry(
          changelog,
          { lastSeenPackage, lastSeenVersion, lastSeenSemverHeading },
          //@ts-ignore
          structuredClone(node as Root)
        );
        return SKIP;
      }
    });
  }

  // console.log(changelog);
  return changelog;
};

const getChangelogs = () => {
  const changelogs: string[] = [];
  const walkFiles = (dirPath: string) => {
    const files = readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = `${dirPath}/${file}`;
      if (
        statSync(filePath).isDirectory() &&
        !file.startsWith("node_modules")
      ) {
        walkFiles(filePath);
      } else {
        if (
          !filePath.match(/^CHANGELOG\.md$/) &&
          file.match(/^CHANGELOG\.md$/)
        ) {
          changelogs.push(filePath);
        }
      }
    });
  };
  walkFiles("./@navikt");
  return changelogs;
};

const createMainChangelog = async (changelog: Changelog): Promise<string> => {
  const headings = [];
  Object.entries(changelog).forEach(([version, versionEntry]) => {
    headings.push(heading(2, [text(version)]));
    for (const [packageName, logGrouping] of Object.entries(versionEntry)) {
      headings.push(heading(3, [text(packageName)]));
      for (const [semverHeading, changes] of Object.entries(logGrouping)) {
        headings.push(heading(4, [text(semverHeading)]));

        //@ts-ignore
        for (const change of changes) {
          headings.push(change);
        }
      }
    }
  });

  headings.unshift(heading(1, [text("Changelog")]));

  const changelog_node_tree = root(headings) as Root;
  // console.log(JSON.stringify(changelog_node_tree, null, 2));
  const processed = await unified()
    .use(remarkStringify, { bullet: "-" })
    .stringify(changelog_node_tree);

  return processed;
};

const changelogFiles = getChangelogs();
console.log("processing the following markdown files:", changelogFiles);
const changelogJSON = await parseMarkdownFiles(changelogFiles);
const changelog = await createMainChangelog(changelogJSON);
writeFileSync("CHANGELOG.md", changelog);
console.log("wrote to CHANGELOG.md");
