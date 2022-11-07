const teams = [
  {
    name: "designsystem",
    prefix: "ds",
    documents: ["komponent_artikkel", "ds_artikkel"],
    navigation: `navigation_designsystem`,
  },
  {
    name: "god_praksis",
    prefix: "gp",
    documents: ["aksel_artikkel", "aksel_blogg", "aksel_prinsipp"],
  },
];

/* Collection of all document-pages to account for */
const allDocumentTypes = teams.reduce(
  (docs, team) => [...docs, ...team.documents],
  []
);

/* Collection of all navigation-documents */
const allNavDocumentIds = teams.map((x) => x?.navigation).filter((x) => x);

/**
 * Defines when a document of a spesific type is set to stagnant or expired
 * @returns [stagnant Date, expired Date]
 */
function getExpireDates() {
  const stagnantDate = new Date();
  const expiredDate = new Date();
  stagnantDate.setDate(stagnantDate.getDate() + 120);
  expiredDate.setDate(expiredDate.getDate() + 180);
  return [stagnantDate, expiredDate];
}

module.exports = {
  teams,
  allDocumentTypes,
  allNavDocumentIds,
  getExpireDates,
};
