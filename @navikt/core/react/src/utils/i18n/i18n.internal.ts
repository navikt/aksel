/** Defaults for internal components, independent of the public locales. Cant be overridden by users. */
const internalTranslations = {
  DataGrid: {
    Pagination: {
      summary: "Rad {from}–{to} av {totalRows}",
      summaryUnknownTotal: "Rad {from}–{to}",
      summaryEmpty: "Ingen rader",
      pageSize: "Rader per side",
      pageOf: "Side {page} av {pageCount}",
      pageOfUnknownTotal: "Side {page}",
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
} satisfies Record<string, Record<string, string | Record<string, string>>>;

export { internalTranslations };
