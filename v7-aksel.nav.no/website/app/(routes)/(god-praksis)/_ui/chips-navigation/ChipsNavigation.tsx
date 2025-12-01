import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { BodyShort, HGrid, HStack, Heading } from "@navikt/ds-react";
import { GodPrakisChipsNavigationButton } from "@/app/(routes)/(god-praksis)/_ui/chips-navigation/ChipsNavigation.button";
import styles from "./ChipsNavigation.module.css";

type GpChipNavigationProps = {
  articles: {
    undertema: string;
    innholdstype: string | null;
  }[];
  innholdstype: string;
  undertema: string;
};

function GodPrakisChipsNavigation(props: GpChipNavigationProps) {
  const { articles, innholdstype, undertema } = props;

  /* Collect all unique undertema and innholdstype values */
  const allUndertema = new Set<string>();
  const allInnholdstype = new Set<string>();

  articles.forEach((article) => {
    if (article.undertema) {
      allUndertema.add(article.undertema);
    }
    if (article.innholdstype) {
      allInnholdstype.add(article.innholdstype);
    }
  });

  const counts = articles.reduce(
    (acc, article) => {
      const matchesUndertema = !undertema || article.undertema === undertema;
      const matchesInnholdstype =
        !innholdstype || article.innholdstype === innholdstype;

      // Initialize all counts to 0
      if (!acc.initialized) {
        allUndertema.forEach((tema) => {
          acc.undertemaCounts[tema] = 0;
        });

        allInnholdstype.forEach((type) => {
          acc.innholdstypeCounts[type] = 0;
        });

        acc.initialized = true;
      }

      /* Count undertema occurrences based on filtering logic */
      if (matchesInnholdstype && article.undertema) {
        acc.undertemaCounts[article.undertema] += 1;
      }

      /* Count innholdstype occurrences based on filtering logic */
      if (matchesUndertema && article.innholdstype) {
        acc.innholdstypeCounts[article.innholdstype] += 1;
      }

      return acc;
    },
    {
      undertemaCounts: {},
      innholdstypeCounts: {},
      initialized: false,
    } as {
      undertemaCounts: Record<string, number>;
      innholdstypeCounts: Record<string, number>;
      initialized: boolean;
    },
  );

  return (
    <HGrid
      columns={{ xs: "auto", sm: "max-content auto" }}
      gap={{ xs: "space-8", sm: "space-16 space-12" }}
      align="start"
    >
      <HStack gap="space-4" align="center" asChild data-color="brand-blue">
        <Heading level="2" size="xsmall" className={styles.chipsHeading}>
          <TagFillIcon aria-hidden fontSize="1.25rem" />
          Undertema
        </Heading>
      </HStack>
      <HStack gap="space-8" align="center" asChild data-color="brand-blue">
        <BodyShort size="small" as="ul">
          <li>
            <GodPrakisChipsNavigationButton
              count={Object.entries(counts.undertemaCounts).reduce(
                (acc, [, count]) => acc + count,
                0,
              )}
              title="Alle"
              type="undertema"
              isActive={!undertema}
              resetOnClick
            />
          </li>
          {Object.entries(counts.undertemaCounts).map(([key, count]) => (
            <li key={key}>
              <GodPrakisChipsNavigationButton
                count={count}
                title={key}
                type="undertema"
                isActive={undertema === key}
              />
            </li>
          ))}
        </BodyShort>
      </HStack>

      <HStack gap="space-2" align="center" asChild data-color="meta-purple">
        <Heading level="2" size="xsmall" className={styles.chipsHeading}>
          <FileFillIcon aria-hidden fontSize="1.25rem" />
          Innholdstype
        </Heading>
      </HStack>
      <HStack gap="space-8" align="center" asChild data-color="meta-purple">
        <BodyShort size="small" as="ul">
          <li>
            <GodPrakisChipsNavigationButton
              count={Object.entries(counts.innholdstypeCounts).reduce(
                (acc, [, count]) => acc + count,
                0,
              )}
              title="Alle"
              type="innholdstype"
              isActive={!innholdstype}
              resetOnClick
            />
          </li>
          {Object.entries(counts.innholdstypeCounts).map(([key, count]) => (
            <li key={key}>
              <GodPrakisChipsNavigationButton
                count={count}
                title={key}
                type="innholdstype"
                isActive={innholdstype === key}
              />
            </li>
          ))}
        </BodyShort>
      </HStack>
    </HGrid>
  );
}

export { GodPrakisChipsNavigation };
