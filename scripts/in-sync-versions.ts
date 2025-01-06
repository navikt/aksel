import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
};

/**
 * Adds some colors to better highlight the warning
 */
function logWarning(dependency: string, filteredVersions: any) {
  const coloredDependency = `${colors.yellow}${dependency}${colors.reset}`;
  const coloredVersions = `${colors.red}${filteredVersions}${colors.reset}`;

  console.warn(`- ${coloredDependency}: ${coloredVersions}`);
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
    console.error("Failed to get workspaces list");
  }
  return [];
}

function validateVersions() {
  const workspaces = getYarnWorkspacesList();

  if (workspaces.length === 0) {
    console.error("No workspaces found");
    return;
  }

  const dependencies = new Map<string, string[]>();

  workspaces.forEach(({ location }) => {
    const packageJson = JSON.parse(
      readFileSync(join(location, "./package.json"), { encoding: "utf-8" }),
    );
    [
      packageJson.dependencies,
      packageJson.devDependencies,
      packageJson.peerDependencies,
    ].forEach((localDeps) => {
      if (!localDeps) {
        return;
      }

      Object.entries(localDeps).forEach(([dependency, version]) => {
        if (!dependencies.has(dependency)) {
          dependencies.set(dependency, []);
        }
        dependencies.get(dependency)?.push(version as string);
      });
    });
  });

  const warnings: { dependency: string; filteredVersions: string[] }[] = [];

  dependencies.forEach((versions, dependency) => {
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
      warnings.push({
        dependency,
        filteredVersions: [...new Set(filteredVersions)],
      });
    }
  });

  if (warnings.length > 0) {
    console.warn(
      "\nWorkspaces local dependency versions not synced across repository:",
    );
    warnings.forEach(({ dependency, filteredVersions }) => {
      logWarning(dependency, filteredVersions);
    });
    console.warn(
      "\nPlease make sure all workspaces have the same version for each dependency.\n\n",
    );
  }
}

validateVersions();
