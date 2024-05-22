import React, { useEffect } from "react";
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
              <VStack gap="1">
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om alderspensjon
                </Heading>
              </VStack>
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
              Alderspensjon fra folketrygden er livsvarig, og sikrer at du har
              inntekt når du er pensjonist.
            </BodyLong>
            <List>
              <List.Item>
                Du tjener opp alderspensjon fra inntekt og botid i Norge.
              </List.Item>
              <List.Item>
                Du kan jobbe samtidig som du tar ut alderspensjon fra NAV.
              </List.Item>
              <List.Item>
                Det er ulike regler for alderspensjon avhengig av når du er
                født.
              </List.Item>
            </List>
            <BodyLong>
              <Link href="#">
                Les mer om alderspensjon, hvem som kan søke og hva du kan få på
                nav.no.
              </Link>
            </BodyLong>
          </GuidePanel>
          <div>
            <Heading level="2" size="large" spacing>
              Her kan du søke om
            </Heading>
            <List>
              <List.Item>Alderspensjon</List.Item>
              <List.Item>Avtalefestet pensjon (AFP) i privat sektor</List.Item>
            </List>
            <BodyLong spacing>
              Du kan lese mer om AFP i privat sektor hos Fellesordningen for
              AFP.
            </BodyLong>
            <Heading level="3" size="medium" spacing>
              Dette kan du ikke søke om her
            </Heading>
            <List>
              <List.Item>
                Avtalefestet pensjon (AFP) i offentlig sektor (link)
              </List.Item>
              <List.Item>Tjenestepensjon (link)</List.Item>
            </List>
            <BodyLong>
              Du kan ikke kombinere AFP i offentlig sektor og alderspensjon.
            </BodyLong>
          </div>
          <div>
            <Heading level="2" size="large" spacing>
              Før du søker
            </Heading>
            <List>
              <List.Item>
                Er du usikker på om du har høy nok opptjening til å ta ut
                pensjon nå, kan du bruke <Link href="#">kalkulatoren</Link> vår.
                Her kan du også se hvor mye du kan få i pensjon og når du kan ta
                ut pensjon.
              </List.Item>
              <List.Item>
                Du kan søke opptil fire måneder før du skal ta ut pensjon. NAV
                må ha mottatt søknaden senest måneden før uttak. Det er ikke
                mulig å søke tilbake i tid, fordi alderspensjon først kan
                innvilges fra måneden etter at søknad er fremsatt. Du må alltid
                søke for å få alderspensjon, også etter fylte 67 år.
              </List.Item>
              <List.Item>
                Du kan ta pauser og fortsette å skrive søknaden i inntil fire
                måneder.
              </List.Item>
            </List>
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
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 0,
};
