import type { z } from "zod";

/**
 * Fuse search cost grows with query length and word count and runs on the main thread,
 * so free-text inputs are capped to keep a single request from blocking the event loop.
 */
const maxSearchQueryLength = 100;
const maxSearchQueryWords = 15;

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function limitSearchQuery(schema: z.ZodString) {
  return schema
    .max(
      maxSearchQueryLength,
      `Must be at most ${maxSearchQueryLength} characters`,
    )
    .refine(
      (value) => countWords(value) <= maxSearchQueryWords,
      `Must be at most ${maxSearchQueryWords} words`,
    );
}

export { limitSearchQuery, maxSearchQueryLength, maxSearchQueryWords };
