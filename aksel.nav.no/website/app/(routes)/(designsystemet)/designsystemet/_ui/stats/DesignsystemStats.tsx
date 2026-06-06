import { BodyShort, HGrid, Heading, VStack } from "@navikt/ds-react";
import type { AkselColor } from "@navikt/ds-react/types/theme";
import { sanityFetch } from "@/app/_sanity/live";
import { DESIGNSYSTEM_STATS_QUERY } from "@/app/_sanity/queries";
import styles from "./DesignsystemStats.module.css";

async function DesignsystemStats() {
  const { data } = await sanityFetch({
    query: DESIGNSYSTEM_STATS_QUERY,
  });

  return (
    <div>
      <VStack gap="space-8" align="center" marginBlock="space-0 space-32">
        <Heading level="2" size="large" spacing>
          Aksel i tall
        </Heading>
      </VStack>
      <HGrid gap="space-24" width="100%" columns={{ md: 3, lg: 3 }}>
        <StatsCard
          label="Komponenter i prod"
          data-color="info"
          stat={`${data?.componentUsage?.new}`}
        />
        <StatsCard
          label="Unike repo"
          data-color="brand-blue"
          stat={`${data?.uniqueRepo?.new}`}
        />
        <StatsCard
          label={`Oppdatert til v${data?.versionStatistics?.currentMajor}`}
          data-color="aksel-brand-pink"
          stat={`${data?.versionStatistics?.latestMajor}`}
        />
      </HGrid>
    </div>
  );
}

function StatsCard({
  "data-color": color,
  label,
  stat,
}: {
  "data-color": AkselColor;
  label: string;
  stat: string;
}) {
  return (
    <dl className={styles.statsCard} data-color={color}>
      <BodyShort as="dt" data-color={color} size="large">
        {label}
      </BodyShort>
      <BodyShort as="dd" data-color={color} size="large">
        <div>{stat}</div>
        <div>Sammenlignet med 90 dager siden</div>
      </BodyShort>
    </dl>
  );
}

export { DesignsystemStats };
