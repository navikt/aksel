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
  templatesUsageQuery,
  type templatesUsageQueryT,
  uniqueRepoQuery,
  type uniqueRepoQueryT,
} from "./update-stats.queries";

const labels = { script: "update-stats", source: "aksel-stats-updater" };

let bigQueryClient: ReturnType<typeof createBigQueryClient>;

async function updateStats() {
  const token = process.env.SANITY_WRITE;
  if (!token) {
    throw new Error(
      "Missing token 'SANITY_WRITE' when updating designsystem statistics",
    );
  }

  bigQueryClient = createBigQueryClient();

  const { oldDate, newDate } = await getTimeframe();
  const [oldComponentUsage, newComponentUsage] = await Promise.all([
    getComponentUsage(oldDate),
    getComponentUsage(newDate),
  ]);

  const [oldTemplateUsage, newTemplateUsage] = await Promise.all([
    getTemplateUsage(oldDate),
    getTemplateUsage(newDate),
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

  const document: Defined<VersionDocument> = {
    _id: "designsystem_statistics",
    _type: "designsystemStatistics",
    componentUsage: {
      old: oldComponentUsage,
      new: newComponentUsage,
    },
    templateUsage: {
      old: oldTemplateUsage,
      new: newTemplateUsage,
    },
    uniqueRepo: {
      old: oldUniqueRepo,
      new: newUniqueRepo,
    },
    versionStatistics,
  };

  transactionClient.createOrReplace(document);

  try {
    await transactionClient.commit();
    console.info("Successfully updated designsystem statistics");
  } catch (e) {
    throw new Error("Failed to commit designsystem statistics update", {
      cause: e,
    });
  }
}

type Defined<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

type VersionDocument = {
  _id: string;
  _type: string;
  componentUsage: DesignsystemStatistics["componentUsage"];
  templateUsage: DesignsystemStatistics["templateUsage"];
  uniqueRepo: DesignsystemStatistics["uniqueRepo"];
  versionStatistics: DesignsystemStatistics["versionStatistics"];
};

function getVersionStatistics(
  oldData: majorVersionQueryT,
  newData: majorVersionQueryT,
): {
  currentMajor: number;
  latestMajorPercentage: string;
  latestMajorChangeCount: number;
} {
  const currentMajor = major(pkg.version);
  const oldCurrentMajorData = oldData.find((d) => d.major === currentMajor);
  const newCurrentMajorData = newData.find((d) => d.major === currentMajor);

  if (!newCurrentMajorData) {
    return {
      currentMajor,
      latestMajorPercentage: "0",
      latestMajorChangeCount: 0,
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
      latestMajorPercentage: "0",
      latestMajorChangeCount: 0,
    };
  }

  const totalNewPercentage = (newCurrentMajorData.count / totalNew) * 100;

  return {
    currentMajor,
    latestMajorPercentage: `${totalNewPercentage.toFixed(0)}`,
    latestMajorChangeCount: updatedProjects,
  };
}

async function getMajorVersions(targetTimestamp: string) {
  const [data] = await bigQueryClient.query({
    query: majorVersionQuery,
    params: { target_timestamp: targetTimestamp },
    labels,
  });

  return data as majorVersionQueryT;
}

async function getUniqueRepo(targetTimestamp: string) {
  const [data] = await bigQueryClient.query({
    query: uniqueRepoQuery,
    params: { target_timestamp: targetTimestamp },
    labels,
  });

  const total = (data as uniqueRepoQueryT)[0]?.total_repositories;
  return typeof total === "number" ? total : 0;
}

async function getComponentUsage(targetTimestamp: string) {
  const [data] = await bigQueryClient.query({
    query: componentUsageQuery,
    params: { target_timestamp: targetTimestamp },
    labels,
  });

  const total = (data as componentUsageQueryT)[0]?.total_components_used;
  return typeof total === "number" ? total : 0;
}

async function getTemplateUsage(targetTimestamp: string) {
  const [data] = await bigQueryClient.query({
    query: templatesUsageQuery,
    params: { target_timestamp: targetTimestamp },
    labels,
  });

  const total = (data as templatesUsageQueryT)[0]?.total_template_instances;
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

  const oldDate = rows[rows.length - 1]?.scrape_timestamp?.value;
  const newDate = rows[1]?.scrape_timestamp?.value;

  if (!oldDate || !newDate) {
    throw new Error("Invalid date data in BigQuery response");
  }

  return {
    oldDate,
    /* We avoid first one since it could be currently being updated */
    newDate,
  };
}

type BigQueryCredentials = { project_id: string } & Record<string, unknown>;

function createBigQueryClient() {
  const GCP_DATASET = "aksel_kr_2023_Q4";

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
  }).dataset(GCP_DATASET);
}

void updateStats().catch((error) => {
  console.error("Failed to update stats", error);
  process.exitCode = 1;
});
