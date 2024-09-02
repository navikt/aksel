import React from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Alert,
  Bleed,
  BodyLong,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Show,
  Stack,
  VStack,
} from "@navikt/ds-react";
import ApplicationPictogram from "../../../components/website-modules/examples/__parts/ApplicationPictogram";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block width="text" gutters>
        <VStack as="main" gap="8">
          <Bleed
            marginInline={{ lg: "24" }}
            data-aksel-template="form-intropage-v1"
          >
            <Stack
              gap="6"
              direction={{ sm: "row-reverse", lg: "row" }}
              justify={{ sm: "space-between", lg: "start" }}
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram />
              </Show>
              <Heading level="1" size="xlarge">
                Søknad om støtte til pass av barn
              </Heading>
            </Stack>
          </Bleed>
          <GuidePanel poster>
            <Heading level="2" size="medium" spacing>
              Hei, Luke Skywalker!
            </Heading>
            <BodyLong spacing>
              Jeg er her for å veilede deg gjennom søknaden. Svarene dine lagres
              underveis, slik at du trygt kan gå tilbake og endre dem.
            </BodyLong>
            <BodyLong spacing>
              Denne pengestøtten kan gis til deg som gjennomfører en
              arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, mottar
              AAP, uføretrygd eller har nedsatt arbeidsevne.
            </BodyLong>
            <BodyLong>
              <Link href="#">
                Les mer om støtte til pass av barn, hvem som kan søke og hva du
                kan få på nav.no.
              </Link>
            </BodyLong>
          </GuidePanel>
          <Alert variant="info">
            <Heading level="2" size="small" spacing>
              Søker du for nytt skole- eller barnehageår?
            </Heading>
            <BodyLong>
              Du må dokumentere utgiftene til barnepass for perioden du søker
              for. Vi anbefaler at du venter med å søke til du har fakturaen for
              det nye skole- eller barnehageåret.
            </BodyLong>
          </Alert>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <List>
              <List.Item>
                Du må dokumentere dine utgifter til pass av barn med faktura som
                inneholder beløp og periode.
              </List.Item>
              <List.Item>
                Du kan bare søke om støtte til pass av barn hvis ingen andre har
                fått dekket utgiftene til pass av samme barn.
              </List.Item>
              <List.Item>
                Vi dekker opp til 64 prosent av utgiftene du har til pass av
                barn.
              </List.Item>
            </List>
          </div>
          <div>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>
                  Informasjon vi henter om deg
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det så informasjon om hvor vi vil hente
                    opplysninger om søkeren og hva slags opplysninger vi henter.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  Hvordan vi behandler personopplysninger
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan vi behandler
                    personopplysningene til søkeren.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hva automatisk behandling
                    er, hva det betyr for søkeren og informasjon om søkerens
                    rettigheter ved automatisk avslag.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan denne søknaden
                    mellomlagrer informasjonen til søkeren og hvor lenge
                    informasjonen lagres. Vi skal informere om mellomlagring ved
                    både automatisk lagring og ved samtykke til lagring med
                    lagre-knapp.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <div>
            <BodyLong>
              Det er viktig at du gir oss riktige opplysninger slik at vi kan
              behandle saken din.{" "}
              <Link href="https://www.nav.no/endringer">
                Les mer om viktigheten av å gi riktige opplysninger.
              </Link>
            </BodyLong>
            <Box paddingBlock="4 8">
              <Checkbox>
                Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
              </Checkbox>
            </Box>
            <Button
              variant="primary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Start søknad
            </Button>
          </div>
        </VStack>
      </Page.Block>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 0,
  sandbox: false,
  title: "Pass av barn",
};
