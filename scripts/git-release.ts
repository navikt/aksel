import { spawnSync } from "child_process";
import fs from "fs";
import simpleGit from "simple-git";

const git = simpleGit();

main();

async function main() {
  const changelogFile = fs.readFileSync("../CHANGELOG.md", "utf-8");

  const newestEntry = changelogFile.split("\n## ")[1]; // The first item is the main heading.
  const releaseLines = newestEntry.trim().split("\n");

  const version = releaseLines[0];
  // Remove the version line and the empty line before the actual release notes.
  releaseLines.splice(0, 2);
  const releaseNotes = releaseLines.join("\n").trim();

  console.log(`Creating release for version: ${version}`);

  const tagName = `v${version}`;

  /* Release will fail if tag is duplicated */
  const tagExists = await gitTagExists(tagName);

  if (tagExists) {
    console.log(`Tag ${tagName} already exists. Skipping release creation.`);
    return;
  }

  try {
    const result = spawnSync(
      "gh",
      [
        "release",
        "create",
        tagName,
        "--title",
        `v${version}`,
        "--notes",
        releaseNotes,
      ],
      { stdio: "inherit" },
    );

    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    console.error("Error creating GitHub release:", error);
  }
}

async function gitTagExists(tag: string): Promise<boolean> {
  try {
    const output = await git.listRemote(["--tags", "origin", tag]);
    return output.includes(tag);
  } catch (error) {
    console.error("Error checking for tag:", error);
    return false; // Assume tag doesn't exist on error
  }
}
