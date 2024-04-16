import { useEffect } from "react";
import { ArrowRightIcon, TasklistIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  HGrid,
  Heading,
  Link,
  Page,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="500-v2" footer={<Footer />}>
      <Header />
      <VStack gap="8">
        <Page.Block as="main" width="text" gutters>
          <HGrid gap="6" columns="3rem auto">
            <TasklistIcon height="3rem" width="3rem" />
            <VStack gap="1">
              <BodyShort size="small">
                NAV 10-07.03 (Om søknaden har ID)
              </BodyShort>
              <Heading level="1" size="large">
                Søknad om [ytelse]
              </Heading>
            </VStack>
          </HGrid>
        </Page.Block>
        <Page.Block width="text">
          <VStack gap="12">
            <GuidePanel poster>
              <VStack gap="4">
                <Heading level="3" size="medium">
                  Hei, [Navn Navnesen]!
                </Heading>
                <BodyShort>
                  Ingress fra nav.no (sjekk om API er en mulighet)
                  <br />
                  Link til produktsiden på nav.no.
                </BodyShort>
                <BodyShort>
                  Vi lagrer svarene i søknaden underveis, så du kan trygt ta
                  pauser og gå tilbake for å endre dem.
                </BodyShort>
              </VStack>
            </GuidePanel>
            <Box>
              <Heading level="2" size="large" spacing>
                Hva kan jeg søke på her? (om relevant)
              </Heading>
              <BodyLong spacing>
                Info om hva du kan søke på her, fordi det er ting du ikke kan
                søke på her. Som kan føre til at brukerne søker på feil ting.
              </BodyLong>
              <Heading level="3" size="medium" spacing>
                Hva kan jeg ikke søke på her? (om relevant)
              </Heading>
              <BodyLong>
                Info om hva du ikke kan søke på med denne søknaden, hva du
                heller må søke på + link til andre søknader.
              </BodyLong>
            </Box>
            <Box>
              <Heading level="2" size="large" spacing>
                Slik søker du
              </Heading>
              <BodyLong spacing>
                Kort info om søknadsprosessen:
                <br />
                Forventet mengde spørsmål og omtrent gjennomføringstid?
                <br />
                Forventet behov for dokumentasjon?
                <br />
                Hvor lenge vi lagrer svarene? Når får du svar?
              </BodyLong>
              <BodyLong spacing>
                Eksempel: I søknaden stiller vi kun spørsmål som er relevante i
                din situasjon.
                <br />
                Antall spørsmål og tiden det tar å søke vil derfor kunne
                variere. De fleste bruker 20-30 minutter.
              </BodyLong>
              <BodyLong>
                Noen av opplysningene du gir i søknaden må du dokumentere. Du
                får beskjed underveis i søknaden om hvilken dokumentasjon du må
                sende inn. Du kan ta pauser når du fyller ut søknaden. Vi lagrer
                søknaden i opptil ## timer/dager mens du fyller ut.
              </BodyLong>
            </Box>
            <Box>
              <BodyLong spacing>
                Det er viktig at du gir oss riktige opplysninger slik at vi kan
                behandle saken din.{" "}
                <Link href="#gi-riktige-opplysninger">
                  Les mer om viktigheten av å gi riktige opplysninger.
                </Link>
              </BodyLong>
              <Checkbox>
                Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
              </Checkbox>
            </Box>
            <Box>
              <Button
                variant="primary"
                icon={<ArrowRightIcon />}
                iconPosition="right"
              >
                Start søknad
              </Button>
            </Box>
            <Box paddingBlock="12 0">
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>
                    Informasjon vi henter om deg
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Vi henter opplysninger om deg fra folkeregisteret og andre
                      registre. Vi bruker opplysningene til å fylle ut deler av
                      søknaden for deg.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>
                    Hvordan vi behandler personopplysninger
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Vi behandler personopplysninger i henhold til
                      personopplysningsloven. Les mer om hvordan vi behandler
                      personopplysninger.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Automatis behandling</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Vi bruker automatiske systemer for å vurdere søknaden din.
                      Systemene gjør en del av jobben med å behandle søknaden
                      din.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Vi lagrer svarene i søknaden underveis, så du kan trygt ta
                      pauser og gå tilbake for å endre dem.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Box>
          </VStack>
        </Page.Block>
      </VStack>
      <Env />
    </Page>
  );
}

function Header() {
  return <div id="decorator-header" />;
}

function Footer() {
  return <div id="decorator-footer" />;
}

const MILJO_URL = "https://www.nav.no/dekoratoren";

function Env() {
  return (
    <div
      id="decorator-env"
      data-src={`${MILJO_URL}/env?context=privatperson&simple=true&availableLanguages=[{"locale":"nb","url":"https://www.nav.no/person/kontakt-oss"},{"locale":"en","url":"https://www.nav.no/person/kontakt-oss/en/"}]`}
    />
  );
}

/**
 * OBS: Dette er ikke anbefalt metode for å laste dekoratør!
 * Se `nav-dekoratoren`-dokumentasjon for riktig implementasjon
 * @see https://github.com/navikt/nav-dekoratoren
 */
function useDekorator() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${MILJO_URL}/client.js`;
    script.async = true;
    document.body.appendChild(script);

    const styles = document.createElement("link");
    styles.href = `${MILJO_URL}/css/client.css`;
    styles.rel = "stylesheet";
    document.head.appendChild(styles);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(styles);
    };
  }, []);
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

export const Demo = {
  render: Example,
};
