import pkgJson from "@navikt/ds-react/package.json" with { type: "json" };
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const packageName = "@navikt/ds-react";
const require = createRequire(import.meta.url);

/**
 * Get the package.json of the target package
 */
function getPackageData() {
  const packageJsonPath = require.resolve(`${packageName}/package.json`);

  const data = {
    packageName,
    pkgJson,
    dir: dirname(packageJsonPath),
  };


  return {
    ...data,
    exportPaths: Object.keys(pkgJson.exports) as unknown as (keyof typeof pkgJson.exports)[],
  };
}

type ValueOf<T> = T[keyof T];



interface ParsedExport {
  isTypeOnly: boolean;
  typesPath: string | undefined;
}

/**
 * Parse an export config to determine if it's type-only and get the types path
 */
function parseExportConfig(
  exportConfig: ValueOf<typeof pkgJson["exports"]>,
  packageDir: string
): ParsedExport {
  if (typeof exportConfig === "string") {
    const dtsPath = exportConfig.replace(/\.js$/, ".d.ts");
    const fullPath = resolve(packageDir, dtsPath);
    return {
      isTypeOnly: exportConfig.endsWith(".d.ts"),
      typesPath: existsSync(fullPath) ? fullPath : undefined,
    };
  }

  const config = exportConfig as Record<string, unknown>;
  const importEntry = config.import as Record<string, unknown> | string | undefined;
  const requireEntry = config.require as Record<string, unknown> | string | undefined;

  // Find the types path
  const typesRelativePath =
    (typeof importEntry === "object" && (importEntry?.types as string)) ||
    (typeof requireEntry === "object" && (requireEntry?.types as string)) ||
    (config.types as string) ||
    undefined;

  const typesPath = typesRelativePath
    ? resolve(packageDir, typesRelativePath)
    : undefined;

  // Check for JS entry points - handle both string and object formats
  const hasImportJs =
    typeof importEntry === "string"
      ? !importEntry.endsWith(".d.ts")
      : (importEntry as Record<string, unknown>)?.default;

  const hasRequireJs =
    typeof requireEntry === "string"
      ? !requireEntry.endsWith(".d.ts")
      : (requireEntry as Record<string, unknown>)?.default;

  const defaultEntry = config.default;
  const hasDirectDefault =
    typeof defaultEntry === "string"
      ? !defaultEntry.endsWith(".d.ts")
      : !!defaultEntry;

  const hasJs = hasImportJs || hasRequireJs || hasDirectDefault;
  const isTypeOnly = !!typesRelativePath && !hasJs;

  return { isTypeOnly, typesPath };
}

export { getPackageData, parseExportConfig, type ParsedExport };
