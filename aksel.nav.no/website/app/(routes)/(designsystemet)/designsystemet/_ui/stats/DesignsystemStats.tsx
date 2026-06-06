import { TrendDownIcon, TrendUpIcon } from "@navikt/aksel-icons";
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

  if (
    !data?.componentUsage?.new ||
    !data?.uniqueRepo?.new ||
    !data?.versionStatistics?.latestMajorPercentage ||
    !data?.uniqueRepo?.old ||
    !data?.componentUsage?.old ||
    !data?.templateUsage?.new ||
    !data?.templateUsage?.old
  ) {
    return null;
  }

  const versionTrend = data?.versionStatistics?.latestMajorPercentage;

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
      <HGrid gap="space-24" width="100%" columns={{ xs: 1, sm: 2, xl: 4 }}>
        <StatsCard
          label="Komponenter i prod"
          stat={formatNumber(data.componentUsage.new).number}
          trend={`${componentUsageTrend.number}${componentUsageTrend.modifier}`}
          modifier={formatNumber(data.componentUsage.new).modifier}
        />
        <StatsCard
          label={`Oppdatert til v${data?.versionStatistics?.currentMajor}`}
          stat={data.versionStatistics.latestMajorPercentage}
          trend={`${versionTrend} løsninger`}
          modifier="%"
        />
        <StatsCard
          label="Maler i bruk"
          stat={data.templateUsage.new}
          trend={`${formatNumber(data.templateUsage.new - data.templateUsage.old).number} maler`}
          modifier={formatNumber(data.templateUsage.new).modifier}
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
      <HStack align="baseline" gap="space-2" as="dd">
        <Heading size="xlarge" as="span">
          {stat}
        </Heading>
        {modifier && (
          <Heading size="medium" data-color="neutral" as="span">
            {modifier}
          </Heading>
        )}
      </HStack>
      {trend && (
        <BodyShort size="small" data-color="success" textColor="subtle" as="dd">
          <BodyShort visuallyHidden>Endring over tid: </BodyShort>
          <HStack gap="space-2" align="center" as="span">
            {isPositive ? trend : trend.replace("-", "")}
            {isPositive ? (
              <TrendUpIcon aria-hidden fontSize="1.5rem" />
            ) : (
              <TrendDownIcon aria-hidden fontSize="1.5rem" />
            )}
          </HStack>
        </BodyShort>
      )}
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
