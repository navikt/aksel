/** Defaults for internal components, independent of the public locales. Cant be overridden by users. */
const internalTranslations = {
  TEST_DATA: {
    label: "Internal grid",
    selected: "{count} rows selected",
  },
} satisfies Record<string, Record<string, string | Record<string, string>>>;

export { internalTranslations };
