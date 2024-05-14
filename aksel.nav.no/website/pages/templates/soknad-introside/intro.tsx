import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
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
                  Søknad om [ytelse]
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
        </Page.Block>
        <Page.Block width="text" gutters>
          <VStack gap="12">
            <GuidePanel poster>
              <Heading level="2" size="medium" spacing>
                Hei, [Navn Navnesen]!
              </Heading>
              <BodyLong spacing>
                Seksjonen GuidePanel brukes til en kort, overordnet veiledning
                til søkeren. Seksjonen henter inn søkerens navn, og gir en en
                komprimert forklaring av pengestøtten, tiltaket eller
                hjelpemiddelet. Denne teksten hentes fra ingressen til
                produktsiden på nav.no.
              </BodyLong>
              <BodyLong>
                Avslutt teksten i seksjonen med en lenke til produktsiden på
                nav.no som åpnes i en ny fane.
              </BodyLong>
            </GuidePanel>
            <div>
              <Heading level="2" size="large" spacing>
                Før du søker
              </Heading>
              <BodyLong spacing>
                Denne seksjonen brukes til å gi søkerne informasjon de vil ha
                stor nytte av før de går i gang med søknaden. Eksempler på
                nyttig informasjon:
              </BodyLong>
              <List>
                <List.Item>
                  Oppgaver brukeren må ha gjort før de søker.{" "}
                  <i>
                    Du må ha meldt deg som arbeidssøker før du kan søke om
                    dagpenger.
                  </i>
                </List.Item>
                <List.Item>
                  Dokumentasjon brukeren kan bli bedt om.{" "}
                  <i>
                    Noen av opplysningene du gir underveis vil du bli bedt om å
                    dokumentere. Du vil trenge xx og xx for å fullføre denne
                    søknaden.
                  </i>
                </List.Item>
                <List.Item>
                  Automatisk lagring.{" "}
                  <i>
                    Vi lagrer svarene dine (xx timer) mens du fyller ut, så du
                    kan ta pauser underveis.
                  </i>
                </List.Item>
                <List.Item>
                  Antall steg og estimert tidsbruk.{" "}
                  <i>
                    Det er XX steg i søknaden, og du kan regne med å bruke ca.
                    XX minutter.
                  </i>
                </List.Item>
                <List.Item>
                  Søknadsfrister.{" "}
                  <i>Husk at du må søke om xx innen xx dager.</i>
                </List.Item>
                <List.Item>
                  Saksbehandlingstider og info om gyldighet, krav osv.{" "}
                  <i>
                    Vi bruker ca. xx uker på å behandle søknaden din. Husk at du
                    må sende meldekort xx ofte selv om du ikke har fått svar på
                    søknaden din om dagpenger ennå.
                  </i>
                </List.Item>
              </List>
              <BodyLong>
                For annen, utfyllende informasjon om søknaden bør du lenke
                direkte til søknadskapittelet i produktsiden, som{" "}
                <Link href="https://www.nav.no/dagpenger#sok">
                  dette eksempelet for dagpenger
                </Link>
                .
              </BodyLong>
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
                  <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hva automatisk behandling
                      er, hva det betyr for søkeren og informasjon om søkerens
                      rettigheter ved automatisk avslag.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan denne søknaden
                      mellomlagrer informasjonen til søkeren og hvor lenge
                      informasjonen lagres. Vi skal informere om mellomlagring
                      ved både automatisk lagring og ved samtykke til lagring
                      med lagre-knapp.
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
  title: "Introside",
  desc: "Introsiden skal informere brukeren om hva de kan søke på, hvordan de søker og hva som skjer etter at de har sendt inn søknaden.",
};
