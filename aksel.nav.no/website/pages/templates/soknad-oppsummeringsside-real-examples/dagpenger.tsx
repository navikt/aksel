import React, { useEffect } from "react";
import {
  ArrowLeftIcon,
  FloppydiskIcon,
  PaperplaneIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import {
  Bleed,
  BodyLong,
  BodyShort,
  Box,
  Button,
  FormProgress,
  FormSummary,
  GuidePanel,
  HGrid,
  Heading,
  Link,
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
      <Page.Block as="main" width="text" gutters>
        <VStack gap="8">
          <Bleed marginInline={{ lg: "24" }}>
            <Stack
              gap="6"
              direction={{ sm: "row-reverse", lg: "row" }}
              justify={{ sm: "space-between", lg: "start" }}
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram />
              </Show>
              <Heading level="1" size="large">
                Søknad om dagpenger
              </Heading>
            </Stack>
          </Bleed>

          <div data-aksel-template="form-summarypage-v1">
            <Link href="#">
              <ArrowLeftIcon aria-hidden /> Forrige steg
            </Link>
            <Box paddingBlock="6 5">
              <Heading level="2" size="large">
                Oppsummering
              </Heading>
            </Box>
            <FormProgress activeStep={12} totalSteps={12}>
              <FormProgress.Step href="#">Steg 1</FormProgress.Step>
              <FormProgress.Step href="#">Steg 2</FormProgress.Step>
              <FormProgress.Step href="#">Steg 3</FormProgress.Step>
              <FormProgress.Step href="#">Steg 4</FormProgress.Step>
              <FormProgress.Step href="#">Steg 5</FormProgress.Step>
              <FormProgress.Step href="#">Steg 6</FormProgress.Step>
              <FormProgress.Step href="#">Steg 7</FormProgress.Step>
              <FormProgress.Step href="#">Steg 8</FormProgress.Step>
              <FormProgress.Step href="#">Steg 9</FormProgress.Step>
              <FormProgress.Step href="#">Steg 10</FormProgress.Step>
              <FormProgress.Step href="#">Steg 11</FormProgress.Step>
              <FormProgress.Step href="#">Oppsummering</FormProgress.Step>
            </FormProgress>
          </div>

          <GuidePanel poster>
            <BodyLong spacing>
              Nå kan du se over at alt er riktig før du sender inn søknaden. Ved
              behov kan du endre opplysningene.
            </BodyLong>
            <BodyLong>
              Når du har sendt inn søknaden kommer du til en kvitteringsside med
              informasjon om veien videre. Der kan du også ettersende
              dokumentasjon som mangler.
            </BodyLong>
          </GuidePanel>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>VOKSENDE TJA</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                <FormSummary.Value>123456 78912</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Alder</FormSummary.Label>
                <FormSummary.Value>45</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
                <FormSummary.Value>
                  Skjellsandveien 40, 3472 Bødalen
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Kontonummer</FormSummary.Label>
                <FormSummary.Value>
                  Vi har ikke registrert kontonummeret ditt, og anbefaler at du
                  legger det inn på Min side.
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Bostedsland</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Hvilket land bor du i?</FormSummary.Label>
                <FormSummary.Value>Norge</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Din situasjon</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Hvilken dato søker du dagpenger fra?
                </FormSummary.Label>
                <FormSummary.Value>3. januar 2024</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Hvilken arbeidstid har du hatt?
                </FormSummary.Label>
                <FormSummary.Value>
                  Jeg har hatt fast arbeidstid i minst seks måneder
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Arbeidsgiver</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>Navnet på bedriften</FormSummary.Label>
                      <FormSummary.Value>Cool AS</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvilket land har du jobbet i?
                      </FormSummary.Label>
                      <FormSummary.Value>Norge</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvordan har dette arbeidsforholdet endret seg?
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Arbeidsgiver har sagt meg opp
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Varighet på arbeidsforholdet
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Fra dato: 10. mars 2016
                        <br />
                        Til dato: 3. januar 2024
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Vet du hvor mange timer du har jobbet i uka før du ble
                        sagt opp?
                      </FormSummary.Label>
                      <FormSummary.Value>
                        Nei, jeg er usikker, bruk opplysninger fra
                        skatteetaten.no/mineinntekter for å beregne min vanlige
                        arbeidstid.
                      </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hva var årsaken til at du ble sagt opp? (Maks 500 tegn)
                      </FormSummary.Label>
                      <FormSummary.Value>Dårlige tider</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Har du fått tilbud om å fortsette hos arbeidsgiveren din
                        i en annen stilling eller et annet sted i Norge?
                      </FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Jobbet du skift eller turnus?
                      </FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Jobbet du rotasjon?</FormSummary.Label>
                      <FormSummary.Value>Nei</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Arbeidsforhold i EØS-området
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du jobbet i et annet EØS-land, Sveits eller Storbritannia
                  i løpet av de siste 36 månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Egen næring</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Driver du egen næringsvirksomhet?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Driver du eget gårdsbruk?</FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Verneplikt</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du avtjent verneplikt i minst tre måneder de siste tolv
                  månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Andre ytelser</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Mottar du eller har du søkt om ytelser fra andre enn NAV?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Får du eller kommer du til å få lønn eller andre økonomiske
                  goder fra tidligere arbeidsgiver?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Utdanning</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Tar du utdanning eller opplæring?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Avsluttet du utdanning i løpet av de siste seks månedene?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Planlegger du å starte eller fullføre utdanning eller
                  opplæring samtidig som du mottar dagpenger?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Barnetillegg</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Barn</FormSummary.Label>
                <FormSummary.Value>
                  <FormSummary.Answers>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Fornavn og mellomnavn
                      </FormSummary.Label>
                      <FormSummary.Value>JURIDISK</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>Etternavn</FormSummary.Label>
                      <FormSummary.Value>BIOGRAFI</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Fødselsdato (dd.mm.åååå)
                      </FormSummary.Label>
                      <FormSummary.Value>1. august 2007</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Hvilket land bor barnet i?
                      </FormSummary.Label>
                      <FormSummary.Value>Norge</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        Forsørger du barnet?
                      </FormSummary.Label>
                      <FormSummary.Value>Ja</FormSummary.Value>
                    </FormSummary.Answer>
                  </FormSummary.Answers>
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Forsørger du barn som ikke vises her?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Reell arbeidssøker
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du jobbe både heltid og deltid?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du jobbe i hele Norge?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Kan du ta alle typer arbeid?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Er du villig til å bytte yrke eller gå ned i lønn?
                </FormSummary.Label>
                <FormSummary.Value>Ja</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">
                Tilleggsopplysninger
              </FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>
                  Har du flere opplysninger du mener er viktige for søknaden
                  din?
                </FormSummary.Label>
                <FormSummary.Value>Nei</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level="2">Dokumentasjon</FormSummary.Heading>
              <FormSummary.EditLink href="#" />
            </FormSummary.Header>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Arbeidsavtale (Cool AS)</FormSummary.Label>
                <FormSummary.Value>
                  Skal sendes av noen andre
                  <br />
                  Navn Navnesen
                </FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Oppsigelse (Cool AS)</FormSummary.Label>
                <FormSummary.Value>
                  Skal sendes av noen andre
                  <br />
                  Navn Navnesen
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>

          <VStack gap="4">
            <BodyShort as="div" size="small" textColor="subtle">
              Sist lagret: 10. mars 2024 kl. 13.55
            </BodyShort>
            <HGrid
              gap="8 4"
              columns={{ xs: 1, sm: 2 }}
              style={{ width: "fit-content" }}
            >
              <Button
                variant="secondary"
                icon={<ArrowLeftIcon aria-hidden />}
                iconPosition="left"
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                icon={<PaperplaneIcon aria-hidden />}
                iconPosition="right"
              >
                Send søknad
              </Button>

              <Button
                variant="tertiary"
                icon={<FloppydiskIcon aria-hidden />}
                iconPosition="left"
              >
                Fortsett senere
              </Button>
              <Button
                variant="tertiary"
                icon={<TrashIcon aria-hidden />}
                iconPosition="left"
              >
                Slett søknaden
              </Button>
            </HGrid>
          </VStack>
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
  sandbox: false,
};
