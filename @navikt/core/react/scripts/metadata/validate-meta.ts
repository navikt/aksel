import type { ParsedMeta } from "./parse-meta";

/** Characters allowed in a Sanity document `_id`. */
export const SANITY_ID_PATTERN = /^[A-Za-z0-9_.-]+$/;

/**
 * Validates the semantic rules of the metadata spec across all meta files and
 * returns a list of human-readable error messages (empty when everything is
 * valid). Kept pure so it can be exercised both by the extractor (which throws
 * on any error) and by the test-suite.
 */
export function validateMetas(metas: ParsedMeta[]): string[] {
  const errors: string[] = [];
  const nameToMeta = new Map<string, string>();

  for (const meta of metas) {
    if (!SANITY_ID_PATTERN.test(meta.name)) {
      errors.push(
        `[${meta.metaFile}] metadata.name "${meta.name}" is not a valid Sanity id (allowed: letters, numbers, "." "-" "_").`,
      );
    }

    const existing = nameToMeta.get(meta.name);
    if (existing) {
      errors.push(
        `Duplicate metadata.name "${meta.name}" in ${meta.metaFile} and ${existing}. Names must be unique.`,
      );
    } else {
      nameToMeta.set(meta.name, meta.metaFile);
    }

    if (meta.components.length === 0) {
      errors.push(`[${meta.metaFile}] metadata.components must not be empty.`);
    }

    if (meta.keywords.length === 0) {
      errors.push(`[${meta.metaFile}] metadata.keywords must not be empty.`);
    }
  }

  for (const meta of metas) {
    for (const related of meta.related) {
      if (!nameToMeta.has(related)) {
        errors.push(
          `[${meta.metaFile}] metadata.related references "${related}", which has no matching meta file.`,
        );
      }
    }
  }

  return errors;
}
