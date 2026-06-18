import Fuse, { type IFuseOptions } from "fuse.js";
import { migrations } from "@navikt/aksel/migrations";

type MigrationResult = {
  name: string;
  description: string;
  version: string;
  warning?: string;
};

const allMigrations: MigrationResult[] = Object.entries(migrations).flatMap(
  ([version, entries]) =>
    entries.map((m) => ({
      name: m.value,
      description: m.description,
      version,
      ...(m.warning ? { warning: m.warning } : {}),
    })),
);

const fuseKeys: NonNullable<IFuseOptions<MigrationResult>["keys"]> = [
  { name: "name", weight: 100 },
  { name: "version", weight: 60 },
  { name: "description", weight: 30 },
];

const fuseOptions: IFuseOptions<MigrationResult> = {
  keys: fuseKeys,
  includeScore: true,
  shouldSort: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
  threshold: 0.3,
  distance: 50,
  useTokenSearch: true,
  ignoreDiacritics: true,
};

const fuse = new Fuse(allMigrations, fuseOptions);

function getAvailableVersions(): string[] {
  return Object.keys(migrations);
}

/**
 * Searches migrations/codemods. When the query references one or more version
 * keys (e.g. "v8", "8", "7->8") only exact version matches are returned;
 * otherwise the query is fuzzy-matched against name/description/version.
 */
function searchMigrations(query?: string): MigrationResult[] {
  if (!query) {
    return allMigrations;
  }

  const normalized = query.toLowerCase().trim();

  /* Match version tokens like "v8", "8", or "7->8" against version keys. */
  const requestedVersions = new Set(
    (normalized.match(/v?\d+/g) ?? []).map((match) =>
      match.startsWith("v") ? match : `v${match}`,
    ),
  );

  /**
   * A version-shaped query is an explicit version filter — don't fall back to
   * fuzzy matching (which would noisily match "migration" in descriptions).
   */
  if (requestedVersions.size > 0) {
    return allMigrations.filter((m) => requestedVersions.has(m.version));
  }

  return fuse.search(normalized).map(({ item }) => item);
}

export { searchMigrations, getAvailableVersions };
export type { MigrationResult };
