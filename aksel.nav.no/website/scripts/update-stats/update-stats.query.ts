const datesQuery = `SELECT DISTINCT DATE(data_scraped_at) AS scrape_date FROM designsystem-prod-d324.aksel_kr_2023_Q4.component_usage ORDER BY scrape_date DESC LIMIT 90`;
type datesQueryT = { scrape_date: { value: string } }[];

const componentUsageQuery = `
SELECT
  COUNT(*) AS total_components_used
FROM designsystem-prod-d324.aksel_kr_2023_Q4.component_usage cu
WHERE cu.data_scraped_at >= TIMESTAMP(@target_date)
  AND cu.data_scraped_at < TIMESTAMP(DATE_ADD(@target_date, INTERVAL 1 DAY));`;

type componentUsageQueryT = { total_components_used: number }[];

const uniqueRepoQuery = `SELECT COUNT(DISTINCT r.repository) AS total_repositories
FROM designsystem-prod-d324.aksel_kr_2023_Q4.repository_usage r
JOIN designsystem-prod-d324.aksel_kr_2023_Q4.dependencies d
  ON r.id = d.repository_usage_id
WHERE d.package_name IN (
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/aksel-icons",
  "@navikt/ds-tokens",
  "@navikt/ds-tailwind"
)
AND DATE(r.data_scraped_at) = @target_date;`;

type uniqueRepoQueryT = { total_repositories: number }[];

const majorVersionQuery = `SELECT major, COUNT(major) AS count
FROM designsystem-prod-d324.aksel_kr_2023_Q4.dependencies
WHERE package_name = "@navikt/ds-react" AND DATE(data_scraped_at) = @target_date
GROUP BY major, data_scraped_at
ORDER BY data_scraped_at, major`;

type majorVersionQueryT = { major: number; count: number }[];

const templatesUsageQuery = `SELECT
DATE(tu.data_scraped_at) AS date,
COUNT(*) AS total_template_instances
FROM designsystem-prod-d324.aksel_kr_2023_Q4.template_usage AS tu
WHERE DATE(tu.data_scraped_at) = @target_date
GROUP BY date;`;

type templatesUsageQueryT = {
  date: string;
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
