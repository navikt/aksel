const core = require("@actions/core");
const github = require("@actions/github");
const { execSync } = require("child_process");

const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

run();

async function run() {
  try {
    if (github.context.payload.pull_request.number === undefined) {
      return;
    }

    let output;
    const ref = github.context.sha;
    const title = github.context.payload.pull_request.title;

    let version = "";
    switch (true) {
      case title.includes("[fix]"):
        version = "patch";
        break;
      case title.includes("[feature]"):
        version = "minor";
        break;
      case title.includes("[breaking]"):
        version = "major";
        break;
      default:
        return;
    }
    try {
      execSync("git checkout master");
      execSync(`git fetch  origin ${ref}`);
      output = execSync(`yarn lerna version ${version} --no-push`, {
        input: "n",
      });
    } catch (error) {
      console.error(error.message);
      return;
    }

    const changes = output
      .toString()
      .split("\n")
      .filter((x) => x.startsWith(" - "))
      .map((x) => x.replace(" - ", ""));

    if (changes.length === 0) {
      return;
    }

    const { data } = await octokit.rest.issues.listComments({
      ...github.context.repo,
      issue_number: github.context.payload.pull_request.number,
    });

    let commentIds = [];

    data.forEach((x) => {
      if (x.user.login === "github-actions[bot]") {
        commentIds.push(x.id);
      }
    });

    for (const f of commentIds) {
      await octokit.rest.issues.deleteComment({
        ...github.context.repo,
        comment_id: f,
      });
    }

    let prText = `### PR vil bumpe disse pakkene med semver ${version}\n\n`;
    changes.forEach((x) => {
      prText = `${prText} - ${x}\n`;
    });

    await octokit.rest.issues.createComment({
      ...github.context.repo,
      issue_number: github.context.payload.pull_request.number,
      body: prText,
    });
  } catch (error) {
    /* core.setFailed(error.message); */
    console.log(error);
  }
}
