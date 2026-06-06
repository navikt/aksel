import {
  BodyLong,
  BodyShort,
  HGrid,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { DESIGNSYSTEM_STATS_QUERY } from "@/app/_sanity/queries";
import styles from "./DesignsystemStats.module.css";

async function DesignsystemStats() {
  const { data } = await sanityFetch({
    query: DESIGNSYSTEM_STATS_QUERY,
  });

  const versionTrend = data?.versionStatistics?.latestMajorChange;

  if (
    !data?.componentUsage?.new ||
    !data?.uniqueRepo?.new ||
    !data?.versionStatistics?.latestMajor ||
    !data?.uniqueRepo?.old ||
    !data?.componentUsage?.old
  ) {
    return null;
  }

  const componentUsageTrend = formatNumber(
    data?.componentUsage?.new - data?.componentUsage?.old,
  );

  return (
    <VStack gap="space-32" width="100%">
      <VStack gap="space-8" align="center">
        <Heading level="2" size="large">
          Aksel i tall
        </Heading>
        <BodyLong size="large">
          Oversikt over hvordan Aksel brukes i produksjon og endring over de
          siste 3 månedene.
        </BodyLong>
      </VStack>
      <HGrid gap="space-24" width="100%" columns={{ md: 3 }}>
        <StatsCard
          label="Komponenter i prod"
          stat={formatNumber(data.componentUsage.new).number}
          trend={`${componentUsageTrend.number}${componentUsageTrend.modifier}`}
          modifier={formatNumber(data.componentUsage.new).modifier}
        />
        <StatsCard
          label={`Oppdatert til v${data?.versionStatistics?.currentMajor}`}
          stat={data.versionStatistics.latestMajor.replace("%", "")}
          trend={`${versionTrend?.replace("+", "").replace("-", "")} løsninger`}
          modifier="%"
        />
        <StatsCard
          label="Unike repo"
          stat={data.uniqueRepo.new}
          trend={`${formatNumber(data?.uniqueRepo?.new - data?.uniqueRepo?.old).number} repo`}
          modifier="+"
        />
      </HGrid>
    </VStack>
  );
}

function StatsCard({
  label,
  stat,
  trend,
  modifier,
}: {
  label: string;
  stat: string | number;
  trend?: string | null;
  modifier?: string;
}) {
  const isPositive = trend && !trend.startsWith("-");

  return (
    <dl className={styles.statsCard} data-color="accent">
      <BodyShort as="dt" textColor="subtle" size="small">
        {label}
      </BodyShort>
      <dd className={styles.statContent}>
        <div>
          <HStack align="baseline" gap="space-2">
            <Heading size="xlarge" as="span">
              {stat}
            </Heading>
            {modifier && (
              <Heading size="medium" data-color="neutral" as="span">
                {modifier}
              </Heading>
            )}
          </HStack>
          <BodyShort size="small" data-color="success" textColor="subtle">
            {isPositive ? "▲" : "▼"}
            {trend && (isPositive ? trend : trend.replace("-", ""))}
          </BodyShort>
        </div>
      </dd>
    </dl>
  );
}

function formatNumber(num: number): {
  number: string;
  modifier: string;
} {
  if (num >= 1_000_000) {
    return { number: `${(num / 1_000_000).toFixed(1)}`, modifier: "M" };
  } else if (num >= 1_000) {
    return { number: `${(num / 1_000).toFixed(1)}`, modifier: "K" };
  }
  return { number: num.toString(), modifier: "" };
}

export { DesignsystemStats };
