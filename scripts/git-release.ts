import { execSync } from "child_process";
import fs from "fs";
import simpleGit from "simple-git";

const git = simpleGit();

main();

async function main() {
  const changelogFile = fs.readFileSync("../CHANGELOG.md", "utf-8");

  const newestEntry = changelogFile.split("\n## ");
  newestEntry.shift(); // Remove the first item, it's the main heading.

  const releaseLines = newestEntry[0].trim().split("\n");

  const version = releaseLines[0];
  releaseLines.splice(0, 2);
  const releaseNotes = releaseLines.join("\n").trim();

  console.log(`Creating release for version: ${version}`);

  const tagName = `release-v${version}`;

  /* Release will fail if tag is duplicated */
  const tagExists = await gitTagExists(tagName);

  if (tagExists) {
    console.log(`Tag ${tagName} already exists. Skipping release creation.`);
    return;
  }

  try {
    execSync(
      `gh release create ${tagName} --title "v${version}" --notes "${releaseNotes}"`,
      { stdio: "inherit" },
    );
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
