import {
  Bleed,
  BodyLong,
  BoxNew,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import styles from "./AkselByNumbers.module.css";

const numbers = [
  {
    number: 94,
    unit: "k",
    description: "Komponenter i prod",
  },
  {
    number: 600,
    unit: "+",
    description: "Løsnigner bruker Aksel",
  },
  {
    number: 91.8,
    unit: "%",
    description: "Bruker siste versjoner",
  },
];

const AkselByNumbers = () => (
  <Bleed marginInline="full">
    <VStack gap="space-32" as="section">
      <VStack gap="space-8" align="center">
        <Heading level="2" size="large">
          Endringslogg
        </Heading>
        <BodyLong size="large" as="p">
          Siste endringer i kode.
        </BodyLong>
      </VStack>
      <HStack gap="space-24">
        {numbers.map(({ number, unit, description }) => (
          <BoxNew
            className={styles.akselByNumbers}
            key={description}
            background="brand-blue-soft"
            borderColor="brand-blue-subtle"
            borderWidth="1"
            borderRadius="xlarge"
            paddingBlock="space-16"
            paddingInline="space-20"
            asChild
          >
            <VStack align="center">
              <Heading size="xlarge">
                {number}
                {unit}
              </Heading>
              <BodyLong size="large" as="p">
                {description}
              </BodyLong>
            </VStack>
          </BoxNew>
        ))}
      </HStack>
    </VStack>
  </Bleed>
);

export default AkselByNumbers;
