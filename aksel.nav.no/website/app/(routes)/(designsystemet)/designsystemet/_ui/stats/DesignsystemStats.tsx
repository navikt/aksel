import { TrendDownIcon, TrendUpIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  HGrid,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { type DynamicFetchOptions, sanityFetch } from "@/app/_sanity/live";
import { DESIGNSYSTEM_STATS_QUERY } from "@/app/_sanity/queries";
import type { DESIGNSYSTEM_STATS_QUERY_RESULT } from "@/app/_sanity/query-types";
import styles from "./DesignsystemStats.module.css";

async function DesignsystemStats({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: DESIGNSYSTEM_STATS_QUERY,
    perspective,
    stega,
  });

  if (!hasRequiredStats(data)) {
    return null;
  }

  const versionTrend = data.versionStatistics.latestMajorChangeCount;

  const componentUsageTrend = formatNumber(
    data.componentUsage.new - data.componentUsage.old,
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
          stat={data.componentUsage.new.toLocaleString("no-NB")}
          trend={`${componentUsageTrend.number}${componentUsageTrend.modifier}`}
        />
        <StatsCard
          label={`Oppgradert til v${data.versionStatistics.currentMajor}`}
          stat={data.versionStatistics.latestMajorPercentage}
          trend={`${versionTrend} løsninger`}
          modifier="%"
        />
        <StatsCard
          label="Maler i bruk"
          stat={formatNumber(data.templateUsage.new).number}
          trend={`${formatNumber(data.templateUsage.new - data.templateUsage.old).number} maler`}
          modifier={formatNumber(data.templateUsage.new).modifier}
        />
        <StatsCard
          label="Unike repo"
          stat={data.uniqueRepo.new}
          trend={`${formatNumber(data.uniqueRepo.new - data.uniqueRepo.old).number} repo`}
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
        <BodyShort
          size="small"
          data-color={isPositive ? "success" : "danger"}
          textColor="subtle"
          as="dd"
        >
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
  }
  if (num >= 1_000) {
    return { number: `${(num / 1_000).toFixed(1)}`, modifier: "K" };
  }
  return { number: num.toString(), modifier: "" };
}

type StatsData = NonNullable<Defined<DESIGNSYSTEM_STATS_QUERY_RESULT>>;

type Defined<T> = {
  [K in keyof T]-?: NonNullable<Defined<T[K]>>;
};

function hasRequiredStats(
  data: DESIGNSYSTEM_STATS_QUERY_RESULT,
): data is StatsData {
  if (!data) {
    return false;
  }

  const componentNew = data.componentUsage?.new;
  const componentOld = data.componentUsage?.old;
  const templateNew = data.templateUsage?.new;
  const templateOld = data.templateUsage?.old;
  const repoNew = data.uniqueRepo?.new;
  const repoOld = data.uniqueRepo?.old;
  const major = data.versionStatistics?.currentMajor;
  const pct = data.versionStatistics?.latestMajorPercentage;
  const change = data.versionStatistics?.latestMajorChangeCount;

  return (
    componentNew != null &&
    componentOld != null &&
    templateNew != null &&
    templateOld != null &&
    repoNew != null &&
    repoOld != null &&
    major != null &&
    pct != null &&
    change != null
  );
}

export { DesignsystemStats };
