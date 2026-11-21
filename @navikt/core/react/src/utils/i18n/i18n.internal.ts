/** Defaults for internal components, independent of the public locales. Cant be overridden by users. */
const internalTranslations = {
  TEST_DATA: {
    label: "Internal grid",
    selected: "{count} rows selected",
  },
  Combobox2: {
    /** The "value" that is shown when multiple options are selected. */
    selectedCount: "{count} valgt",
  },
} satisfies Record<string, Record<string, string | Record<string, string>>>;

export { internalTranslations };
