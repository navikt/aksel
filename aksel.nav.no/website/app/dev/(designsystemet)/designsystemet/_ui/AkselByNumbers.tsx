import {
  Bleed,
  BodyLong,
  BoxNew,
  HGrid,
  Heading,
  VStack,
} from "@navikt/ds-react";
import "./AkselByNumbers.css";

const numbers = [
  {
    number: 94,
    unit: "k",
    description: "Komponenter i prod",
  },
  {
    number: 600,
    unit: "+",
    description: "Løsninger bruker Aksel",
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
          Aksel i tall
        </Heading>
        <BodyLong size="large" as="p">
          Aktiv forvaltning og økende bruk.
        </BodyLong>
      </VStack>
      <HGrid gap="space-24" width="1024px" columns={3}>
        {numbers.map(({ number, unit, description }, index) => (
          <BoxNew
            className="akselByNumbers"
            key={description}
            background="brand-blue-soft"
            borderColor="brand-blue-subtle"
            borderWidth="1"
            borderRadius="xlarge"
            paddingBlock="space-16"
            paddingInline="space-20"
            data-color={["brand-teal", "brand-blue", "brand-pink"][index]}
            asChild
          >
            <VStack align="center">
              <Heading as="h2" size="xlarge" className="akselByNumbers__number">
                {number}
                <Heading
                  as="span"
                  size="xlarge"
                  textColor="subtle"
                  className="akselByNumbers__unit"
                  data-color-role={
                    ["brand-teal", "brand-blue", "brand-pink"][index]
                  }
                >
                  {unit}
                </Heading>
              </Heading>
              <BodyLong size="large" as="p">
                {description}
              </BodyLong>
            </VStack>
          </BoxNew>
        ))}
      </HGrid>
    </VStack>
  </Bleed>
);

export default AkselByNumbers;
