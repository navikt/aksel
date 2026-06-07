const datesQuery = `SELECT DISTINCT TIMESTAMP(data_scraped_at) AS scrape_timestamp FROM component_usage ORDER BY scrape_timestamp DESC LIMIT 90`;
type datesQueryT = { scrape_timestamp: { value: string } }[];

const componentUsageQuery = `
SELECT
  COUNT(*) AS total_components_used
FROM component_usage cu
WHERE cu.data_scraped_at = @target_timestamp;`;

type componentUsageQueryT = { total_components_used: number }[];

const uniqueRepoQuery = `SELECT COUNT(DISTINCT r.repository) AS total_repositories
FROM repository_usage r
JOIN dependencies d
  ON r.id = d.repository_usage_id
WHERE d.package_name IN (
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/aksel-icons",
  "@navikt/ds-tokens",
  "@navikt/ds-tailwind"
)
AND r.data_scraped_at = @target_timestamp;`;

type uniqueRepoQueryT = { total_repositories: number }[];

const majorVersionQuery = `SELECT major, COUNT(major) AS count
FROM dependencies
WHERE package_name = "@navikt/ds-react" AND data_scraped_at = @target_timestamp
GROUP BY major, data_scraped_at
ORDER BY data_scraped_at, major`;

type majorVersionQueryT = { major: number; count: number }[];

const templatesUsageQuery = `SELECT
tu.data_scraped_at AS scrape_timestamp,
COUNT(*) AS total_template_instances
FROM template_usage AS tu
WHERE tu.data_scraped_at = @target_timestamp
GROUP BY scrape_timestamp;`;

type templatesUsageQueryT = {
  scrape_timestamp: string;
  total_template_instances: number;
}[];

export {
  datesQuery,
  componentUsageQuery,
  uniqueRepoQuery,
  majorVersionQuery,
  templatesUsageQuery,
};
export type {
  datesQueryT,
  componentUsageQueryT,
  uniqueRepoQueryT,
  majorVersionQueryT,
  templatesUsageQueryT,
};
