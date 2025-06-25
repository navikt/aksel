import { BodyLong, BoxNew, HGrid, Heading, VStack } from "@navikt/ds-react";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import "./AkselByNumbers.css";

type AkselByNumbersData = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_aksel_in_numbers"]
>;
type AkselByNumbersStatistics = NonNullable<AkselByNumbersData>["statistics"];
type AkselByNumbersStatisticsEntry =
  NonNullable<AkselByNumbersStatistics>[number];

type AkselByNumbersProps = {
  title?: AkselByNumbersData["title"];
  description?: AkselByNumbersData["ingress"];
  entries:
    | {
        number: AkselByNumbersStatisticsEntry["number"];
        unit: AkselByNumbersStatisticsEntry["unit"];
        title: AkselByNumbersStatisticsEntry["title"];
      }[]
    | null
    | undefined;
};

const AkselByNumbers = ({
  title,
  description,
  entries,
}: AkselByNumbersProps) => (
  <VStack gap="space-32" as="section" width="100%">
    <VStack gap="space-8" align="center">
      {title && (
        <Heading level="2" size="large">
          {title}
        </Heading>
      )}
      {description && (
        <BodyLong size="large" as="p">
          {description}
        </BodyLong>
      )}
    </VStack>
    {entries && entries.length > 0 && (
      <HGrid gap="space-24" width="100%" columns={{ md: 3, lg: 3 }}>
        {entries.map(({ number, unit, title: numberTitle }, index) => {
          const dataColor = [
            "aksel-brand-teal",
            "aksel-brand-blue",
            "aksel-brand-pink",
          ][index];
          return (
            <BoxNew
              className="akselByNumbers"
              key={numberTitle}
              borderWidth="1"
              borderRadius="xlarge"
              paddingBlock="space-16"
              paddingInline="space-20"
              data-color={dataColor}
              asChild
            >
              <VStack align="center">
                {number && (
                  <Heading
                    as="h2"
                    size="xlarge"
                    className="akselByNumbers__number"
                    data-color={dataColor}
                  >
                    {number}
                    {unit && (
                      <Heading
                        as="span"
                        size="xlarge"
                        textColor="subtle"
                        className="akselByNumbers__unit"
                        data-color={dataColor}
                      >
                        {unit}
                      </Heading>
                    )}
                  </Heading>
                )}
                {numberTitle && (
                  <BodyLong size="large" as="p" data-color={dataColor}>
                    {numberTitle}
                  </BodyLong>
                )}
              </VStack>
            </BoxNew>
          );
        })}
      </HGrid>
    )}
  </VStack>
);

export default AkselByNumbers;
