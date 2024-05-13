import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Alert,
  Bleed,
  BodyLong,
  BodyShort,
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
import { ApplicationPictogram } from "@/assets/Icons";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/utils/dekorator";

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="form-intropage-v1" footer={<Footer />}>
      <Header />
      <VStack as="main" gap="8">
        <Page.Block width="text" gutters>
          <Bleed marginInline={{ lg: "24" }}>
            <Stack
              align="center"
              gap="6"
              direction={{ xs: "row-reverse", lg: "row" }}
              justify="start"
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram title="Application" />
              </Show>
              <VStack gap="1">
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om støtte til pass av barn
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
        </Page.Block>
        <Page.Block width="text" gutters>
          <VStack gap="12">
            <GuidePanel poster>
              <Heading level="2" size="medium" spacing>
                Hei, Luke Skywalker!
              </Heading>
              <BodyLong spacing>
                Jeg er her for å veilede deg gjennom søknaden. Svarene dine
                lagres underveis, slik at du trygt kan gå tilbake og endre dem.
              </BodyLong>
              <BodyLong spacing>
                Denne pengestøtten kan gis til deg som gjennomfører en
                arbeidsrettet aktivitet og er enslig mor/far, gjenlevende,
                mottar AAP, uføretrygd eller har nedsatt arbeidsevne.
              </BodyLong>
              <BodyLong>
                <Link href="#">
                  Les mer om støtte til pass av barn, hvem som kan søke og hva
                  du kan få på nav.no.
                </Link>
              </BodyLong>
            </GuidePanel>
            <Alert variant="info">
              <Heading level="2" size="small" spacing>
                Søker du for nytt skole- eller barnehageår?
              </Heading>
              <BodyLong>
                Du må dokumentere utgiftene til barnepass for perioden du søker
                for. Vi anbefaler at du venter med å søke til du har fakturaen
                for det nye skole- eller barnehageåret.
              </BodyLong>
            </Alert>
            <div>
              <Heading level="2" size="large" spacing>
                Før du søker
              </Heading>
              <List>
                <List.Item>
                  Du må dokumentere dine utgifter til pass av barn med faktura
                  som inneholder beløp og periode.
                </List.Item>
                <List.Item>
                  Du kan bare søke om støtte til pass av barn hvis ingen andre
                  har fått dekket utgiftene til pass av samme barn.
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
                    <BodyLong spacing>
                      Her skal det så informasjon om hvor vi vil hente
                      opplysninger om søkeren og hva slags opplysninger vi
                      henter.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>
                    Hvordan vi behandler personopplysninger
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan vi behandler
                      personopplysningene til søkeren.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Automatis behandling</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hva automatisk behandling
                      er for noe og hva det betyr for søkeren. Samt informasjon
                      om søkers rettigheter ved automatisk avslag.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan denne søknaden
                      mellomlagrer informasjonen til søkeren og hvor lenge
                      informasjonen lagres. Både automatisk lagring og samtykke
                      til lagring med lagre-knapp.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>
            <Box paddingBlock="0 12">
              <BodyLong>
                Det er viktig at du gir oss riktige opplysninger slik at vi kan
                behandle saken din.{" "}
                <Link href="#gi-riktige-opplysninger">
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
            </Box>
          </VStack>
        </Page.Block>
      </VStack>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  title: "Introside pass av barn",
};
