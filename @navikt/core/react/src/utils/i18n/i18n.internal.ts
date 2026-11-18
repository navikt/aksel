/** Defaults for internal components, independent of the public locales. Cant be overridden by users. */
const internalTranslations = {
  DataGrid: {
    loading: "Laster innhold",
    Pagination: {
      summary: "Rad {from}–{to} av {totalRows}",
      summaryUnknownTotal: "Rad {from}–{to}",
      summaryEmpty: "Ingen rader",
      pageSize: "Rader per side",
      pageSizeTrigger: "{summary}, velg antall rader per side, {size} valgt",
      pageSizeOption: "{size} per side",
      pageOf: "Side {page} av {pageCount}",
      pageOfUnknownTotal: "Side {page}",
      goToPage: "Gå til side",
      ofPageCount: "av {pageCount}",
      first: "Første side",
      previous: "Forrige side",
      next: "Neste side",
      last: "Siste side",
      navLabel: "Sidenavigering",
    },
  },
  TEST_DATA: {
    label: "Internal grid",
    selected: "{count} rows selected",
  },
  Combobox2: {
    /** The "value" that is shown when multiple options are selected. */
    selectedCount: "{count} valgt",
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
