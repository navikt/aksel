import { error as actionsError } from "@actions/core";
import { execSync } from "child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

validateVersions();

function validateVersions() {
  const workspaces = getYarnWorkspacesList();

  if (workspaces.length === 0) {
    exitWithError("No workspaces found");
  }

  const dependencies = new Map<string, string[]>();

  for (const { location } of workspaces) {
    const packageJson = JSON.parse(
      readFileSync(join(location, "./package.json"), { encoding: "utf-8" }),
    );

    for (const localDependency of [
      packageJson.dependencies,
      packageJson.devDependencies,
    ]) {
      if (!localDependency) {
        continue;
      }

      for (const [dependency, version] of Object.entries(localDependency)) {
        if (!dependencies.has(dependency)) {
          dependencies.set(dependency, []);
        }
        dependencies.get(dependency)?.push(version as string);
      }
    }
  }

  const depsOutOfSync: { dependency: string; filteredVersions: string[] }[] =
    [];

  for (const [dependency, versions] of dependencies) {
    /**
     * While we could resolve these cases using "semver" or other packages,
     * we are going to keep it simple and just check "regular" cases.
     */
    const filteredVersions = versions.filter(
      (version) => version !== "*" && !version.includes(">="),
    );

    const versionsAreEqual = filteredVersions.every(
      (version) => version === filteredVersions[0],
    );

    if (!versionsAreEqual) {
      depsOutOfSync.push({
        dependency,
        /* To keep console simple, we hide duplicates */
        filteredVersions: [...new Set(filteredVersions)],
      });
    }
  }

  if (depsOutOfSync.length > 0) {
    console.info("");

    if (process.env.CI) {
      const joinedDependencies = depsOutOfSync
        .map(
          ({ dependency, filteredVersions }) =>
            `- ${dependency}: ${filteredVersions.join(", ")}`,
        )
        .join(" \n");
      actionsError(
        `Workspaces local dependency versions not synced across repository: \n${joinedDependencies} \nPlease make sure all workspaces have the same version for each dependency.`,
        {
          title: "Inconsistent dependency versions",
          file: "yarn.lock",
          startLine: 1,
        },
      );
    } else {
      console.error(
        "Workspaces local dependency versions not synced across repository:",
      );
      for (const { dependency, filteredVersions } of depsOutOfSync) {
        logDependency(dependency, filteredVersions);
      }
      console.error(
        "Please make sure all workspaces have the same version for each dependency.\n",
      );
    }

    process.exit(1);
  }
}

/**
 * Get the list of workspaces in the repository by using the `yarn workspaces list` command
 */
function getYarnWorkspacesList(): { location: string; name: string }[] {
  try {
    const execCommand = execSync("yarn workspaces list --json", {
      encoding: "utf-8",
    });

    const workspaces = execCommand
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const { location, name } = JSON.parse(line);
        return { location, name };
      });

    return workspaces;
  } catch {
    exitWithError("Failed to get workspaces list");
  }
  return [];
}

/**
 * Adds some colors to better highlight the warning
 */
function logDependency(dependency: string, filteredVersions: string[]) {
  const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
  };

  const coloredDependency = `${colors.yellow}${dependency}${colors.reset}`;
  const coloredVersions = `${colors.red}${filteredVersions.join(", ")}${
    colors.reset
  }`;

  console.error(`- ${coloredDependency}: ${coloredVersions}`);
}

function exitWithError(message: string) {
  console.error(message);
  process.exit(1);
}
