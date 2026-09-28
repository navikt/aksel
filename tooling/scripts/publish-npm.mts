/**
 * `changeset publish` (v3) uses `yarn npm info/publish` in Yarn Berry repos, which reads
 * the `@navikt` scope registry from `.yarnrc.yml`. That scope points to GitHub Packages
 * for installs, so we temporarily point it to npmjs while publishing (auth via OIDC).
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const YARNRC_PATH = ".yarnrc.yml";
const GPR_REGISTRY = `npmRegistryServer: "https://npm.pkg.github.com"`;
const NPM_REGISTRY = `npmRegistryServer: "https://registry.npmjs.org"`;

const originalYarnrc = readFileSync(YARNRC_PATH, "utf-8");

if (!originalYarnrc.includes(GPR_REGISTRY)) {
  console.error(`Expected ${YARNRC_PATH} to contain '${GPR_REGISTRY}'`);
  process.exit(1);
}

let exitCode = 1;

try {
  writeFileSync(
    YARNRC_PATH,
    originalYarnrc.replace(GPR_REGISTRY, NPM_REGISTRY),
  );

  const result = spawnSync("yarn", ["changeset", "publish"], {
    stdio: "inherit",
  });

  exitCode = result.status ?? 1;
} finally {
  writeFileSync(YARNRC_PATH, originalYarnrc);
}

process.exit(exitCode);
