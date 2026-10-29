/** Defaults for internal components, independent of the public locales. Cant be overridden by users. */
const internalTranslations = {
  TEST_DATA: {
    label: "Internal grid",
    selected: "{count} rows selected",
  },
  Combobox2: {
    /** Label for filter input. Only visible to screen readers. */
    filter: "Filtrer",
    noHits: "Ingen treff",
    /** Only announced to screen readers. */
    oneHit: "Ett treff",
    /** Only announced to screen readers. */
    hitsCount: "{count} treff",
  },
} satisfies Record<string, Record<string, string | Record<string, string>>>;

export { internalTranslations };
