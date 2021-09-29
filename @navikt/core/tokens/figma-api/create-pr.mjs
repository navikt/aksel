import { Octokit } from "@octokit/rest";
import OctokitPr from "octokit-create-pull-request";
import { execSync } from "child_process";

const OctokitBase = Octokit.plugin(OctokitPr).defaults({
  userAgent: "Designsystem token updater",
  auth: process.env.TOKEN,
});

export const createNewPr = async (content) => {
  const octokit = new OctokitBase();

  const issues = await octokit.rest.pulls.list({
    owner: "navikt",
    repo: "nav-frontend-moduler",
  });

  if (
    issues.data.find((x) => x?.head?.ref === "ds-token-sync-branch")?.number
  ) {
    execSync("git stash");
    execSync("git checkout ds-token-sync-branch");
    execSync("git stash pop");
    execSync("git add .");
    execSync(`git commit -m "updated PR content"`);
    execSync(`git push --force"`);

    console.log("Oppdatert PR");
    return;
  } else {
    try {
      octokit.createPullRequest({
        owner: "navikt",
        repo: "nav-frontend-moduler",
        title: "[FEATURE] Color-tokens: Automatisk oppdatering",
        body: "",
        head: "ds-token-sync-branch",
        changes: {
          files: {
            "@navikt/core/tokens/src/colors.json": content,
          },
          commit: "Oppdatert colors.json",
        },
      });
    } catch (e) {
      throw e;
    }
  }

  console.log("Laget PR");
};
