import { BigQuery } from "@google-cloud/bigquery";
import fs from "node:fs";
import { major } from "semver";
import pkg from "@navikt/ds-react/package.json";
import type { DesignsystemStatistics } from "../../app/_sanity/query-types";
import { noCdnClient } from "../../sanity/interface/client.server";
import {
  componentUsageQuery,
  type componentUsageQueryT,
  datesQuery,
  type datesQueryT,
  majorVersionQuery,
  type majorVersionQueryT,
  uniqueRepoQuery,
  type uniqueRepoQueryT,
} from "./update-stats.query";

/* DesignsystemStatistics */
const labels = { script: "update-stats", source: "aksel-stats-updater" };
type BigQueryCredentials = { project_id: string } & Record<string, unknown>;

const bigQueryClient = createBigQueryClient();

async function updateStats() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_WRITE' when updating designsystem statistics",
    );
  }

  const { oldDate, newDate } = await getTimeframe();

  const [oldComponentUsage, newComponentUsage] = await Promise.all([
    getComponentUsage(oldDate),
    getComponentUsage(newDate),
  ]);

  const [oldUniqueRepo, newUniqueRepo] = await Promise.all([
    getUniqueRepo(oldDate),
    getUniqueRepo(newDate),
  ]);

  const [oldMajorVersions, newMajorVersions] = await Promise.all([
    getMajorVersions(oldDate),
    getMajorVersions(newDate),
  ]);

  const versionStatistics = getVersionStatistics(
    oldMajorVersions,
    newMajorVersions,
  );

  const transactionClient = noCdnClient(token).transaction();
  transactionClient.createOrReplace({
    _id: "designsystem_statistics",
    _type: "designsystemStatistics",
    componentUsage: {
      old: oldComponentUsage,
      new: newComponentUsage,
    } satisfies DesignsystemStatistics["componentUsage"],
    uniqueRepo: {
      old: oldUniqueRepo,
      new: newUniqueRepo,
    } satisfies DesignsystemStatistics["uniqueRepo"],
    versionStatistics:
      versionStatistics satisfies DesignsystemStatistics["versionStatistics"],
  });

  await transactionClient
    .commit()
    .then(() => console.info(`Successfully updated designsystem statistics`))
    .catch((e) => {
      throw new Error(e.message);
    });
}

function getVersionStatistics(
  oldData: majorVersionQueryT,
  newData: majorVersionQueryT,
): {
  currentMajor: number;
  latestMajor: string;
  latestMajorChange: string;
} {
  const currentMajor = major(pkg.version);
  const oldCurrentMajorData = oldData.find((d) => d.major === currentMajor);
  const newCurrentMajorData = newData.find((d) => d.major === currentMajor);

  if (!newCurrentMajorData) {
    return {
      currentMajor,
      latestMajor: "0%",
      latestMajorChange: "0",
    };
  }

  const totalNew = newData.reduce((sum, d) => sum + d.count, 0);
  const oldCurrentMajorCount = oldCurrentMajorData?.count ?? 0;
  const updatedProjects = Math.max(
    newCurrentMajorData.count - oldCurrentMajorCount,
    0,
  );

  if (totalNew === 0) {
    return {
      currentMajor,
      latestMajor: "0%",
      latestMajorChange: "0",
    };
  }

  const totalNewPercentage = (newCurrentMajorData.count / totalNew) * 100;

  return {
    currentMajor,
    latestMajor: `${totalNewPercentage.toFixed(2)}%`,
    latestMajorChange:
      updatedProjects > 0 ? `+${updatedProjects}` : `-${updatedProjects}`,
  };
}

async function getMajorVersions(targetDate: string) {
  const [data] = await bigQueryClient.query({
    query: majorVersionQuery,
    params: { target_date: targetDate },
    labels,
  });

  return data as majorVersionQueryT;
}

async function getUniqueRepo(targetDate: string) {
  const [data] = await bigQueryClient.query({
    query: uniqueRepoQuery,
    params: { target_date: targetDate },
    labels,
  });

  const total = (data as uniqueRepoQueryT)[0]?.total_repositories;
  return typeof total === "number" ? total : 0;
}

async function getComponentUsage(targetDate: string) {
  const [data] = await bigQueryClient.query({
    query: componentUsageQuery,
    params: { target_date: targetDate },
    labels,
  });

  const total = (data as componentUsageQueryT)[0]?.total_components_used;
  return typeof total === "number" ? total : 0;
}

async function getTimeframe() {
  const [data] = await bigQueryClient.query({
    query: datesQuery,
    labels,
  });

  const rows = data as datesQueryT;

  if (rows.length < 3) {
    throw new Error("Not enough data points to determine timeframe");
  }

  const oldDate = rows[rows.length - 1]?.scrape_date?.value;
  const newDate = rows[1]?.scrape_date?.value;

  if (!oldDate || !newDate) {
    throw new Error("Invalid date data in BigQuery response");
  }

  return {
    oldDate,
    /* We avoid first one since it could be currently being updated */
    newDate,
  };
}

function createBigQueryClient() {
  let gcpCredentials: BigQueryCredentials;

  try {
    const rawCredentials = process.env.GCP_CREDENTIALS;

    if (rawCredentials) {
      gcpCredentials = JSON.parse(rawCredentials) as BigQueryCredentials;
    } else {
      gcpCredentials = JSON.parse(
        fs.readFileSync("scripts/service-account.json", "utf-8"),
      ) as BigQueryCredentials;
    }

    if (!gcpCredentials.project_id) {
      throw new Error("Missing project_id in GCP credentials");
    }
  } catch {
    throw new Error("Failed to load GCP credentials");
  }

  return new BigQuery({
    projectId: gcpCredentials.project_id,
    credentials: gcpCredentials,
  });
}

void updateStats().catch((error) => {
  console.error("Failed to update stats", error);
  process.exitCode = 1;
});
