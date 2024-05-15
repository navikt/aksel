import { useEffect } from "react";
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

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <VStack as="main" gap="8">
        <Page.Block width="text" gutters>
          <Bleed
            marginInline={{ lg: "24" }}
            data-aksel-template="form-intropage-v1"
          >
            <Stack
              align="center"
              gap="6"
              direction={{ sm: "row-reverse", lg: "row" }}
              justify={{ sm: "space-between", lg: "start" }}
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram />
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
                til søkeren. Seksjonen henter inn søkerens navn, og gir en
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
                Her kan du søke om
              </Heading>
              <BodyLong spacing>
                Dette feltet brukes hvis det kan være utfordrende å finne riktig
                søknad, for eksempel fordi det er mange søknader som er nesten
                lik hverandre. Bruk feltet til en kort og tydelig forklaring på
                hva denne søknaden gjelder.
              </BodyLong>
              <Heading level="3" size="medium" spacing>
                Dette kan du ikke søke om her
              </Heading>
              <BodyLong>
                Legg inn informasjon om hva du ikke kan søke om fra denne siden
                og legg inn lenke til de aktuelle søknadene man skal bruke i
                stedet.
              </BodyLong>
            </div>
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
            <Box>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>
                    Informasjon vi henter om deg
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong>
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
                      informasjonen lagres. Vi skal informere om mellomlagring
                      ved både automatisk lagring og ved samtykke til lagring
                      med lagre-knapp.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Box>
            <div>
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
            </div>
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

const ApplicationPictogram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    style={{ flexShrink: 0 }}
    aria-hidden
  >
    <rect x="23.25" y="22.5" width="26.25" height="9" fill="#CCE2F0" />
    <rect x="23.25" y="36.75" width="26.25" height="9" fill="#CCE2F0" />
    <circle cx="36.75" cy="34.5" r="21" fill="#CCE2F0" />
    <path
      d="M23.7672 5.508L30.1202 11.8434M1.5 33.75H34.5M26.4706 2.81211L10.5882 18.6506L9 26.5699L16.9412 24.986L32.8235 9.14751C34.5778 7.39804 34.5778 4.56158 32.8235 2.81211C31.0692 1.06263 28.2249 1.06263 26.4706 2.81211Z"
      stroke="#23262A"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 44.25L63.75 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 52.5L63.75 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56.25 60.75L63.75 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 52.5L51 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 52.5L51 52.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 44.25L51 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 44.25L51 44.25"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 60.75L51 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 60.75L51 60.75"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="41.25"
      y="33"
      width="29.25"
      height="37.5"
      stroke="#262626"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  title: "Alternativ søknad",
  desc: "I noen tilfeller finnes det søknader som dekker litt andre behov. For å redusere sjansen for at brukere søker på feil ytelse, så kan du inkludere en seksjon som sier hva du kan søke på i denne søknaden, og eventuelt hva du må bruke en annen søknad for.",
};
