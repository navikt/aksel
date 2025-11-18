import {
  BulletListIcon,
  ClockDashedIcon,
  ExclamationmarkTriangleIcon,
  InformationSquareIcon,
} from "@navikt/aksel-icons";
import { BodyLong, InfoCard, Link, List, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <InfoCard data-color="neutral">
        <InfoCard.Header icon={<BulletListIcon aria-hidden />}>
          <InfoCard.Title>Oppsummering</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          <BodyLong>
            Her finner du en kort oppsummering av de viktigste punktene i
            artikkelen.
          </BodyLong>
          <List>
            <List.Item>Punkt 1</List.Item>
            <List.Item>Punkt 2</List.Item>
          </List>
        </InfoCard.Content>
      </InfoCard>
      <InfoCard data-color="info">
        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
          <InfoCard.Title>Fedrekvotesaken</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Gikk du glipp av dager med foreldrepenger mellom januar 2007 og
          oktober 2021 fordi du ikke søkte innen en gitt frist? Les mer på{" "}
          <Link href="#" inlineText>
            www.nav.no/fedrekvotesaken
          </Link>
          .
        </InfoCard.Content>
      </InfoCard>
      <InfoCard data-color="warning">
        <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
          <InfoCard.Title>Denne personen er under 18 år</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          <List>
            <List.Item>
              Det kreves et samtykke fra foresatte for å kunne starte
              oppfølging. Følg retningslinjene for samtykke på Navet.
            </List.Item>
            <List.Item>
              Du må opprette et notat og dokumentere vurderingen i Gosys.
            </List.Item>
          </List>
        </InfoCard.Content>
      </InfoCard>
      <InfoCard data-color="danger">
        <InfoCard.Header icon={<ClockDashedIcon aria-hidden />}>
          <InfoCard.Title>Oppdaget feil i forrige publisering</InfoCard.Title>
        </InfoCard.Header>
        <InfoCard.Content>
          Vi oppdaget en feil i forrige publisering som påvirker noen av
          dataene. Vi jobber med å rette opp i dette så raskt som mulig.
        </InfoCard.Content>
      </InfoCard>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
