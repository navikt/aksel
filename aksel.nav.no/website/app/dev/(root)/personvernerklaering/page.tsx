import { BodyLong, Box, Heading, Link } from "@navikt/ds-react";
import { Page as DsPage, PageBlock } from "@navikt/ds-react/Page";
import { getCookieConsent } from "@/app/_ui/consent-banner/ConsentBanner.utils";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { ConsentForm } from "./_ui/ConsentForm";

export const metadata = {
  title: "Personvern og sikkerhet",
  description:
    "Informasjon om hvordan Aksel behandler dine personopplysninger på aksel.nav.no.",
};

export default async function Page() {
  const consent = await getCookieConsent();

  return (
    <DsPage footer={<Footer />} footerPosition="belowFold">
      <Header />
      <Box paddingBlock="space-40" asChild>
        <PageBlock as="main" id="hovedinnhold" tabIndex={-1} width="md" gutters>
          <Heading level="1" size="xlarge" data-aksel-heading-color spacing>
            Personvern og sikkerhet på aksel.nav.no
          </Heading>
          <BodyLong spacing>
            Aksel er en nettside Nav Arbeids- og velferdsdirektoratet har
            behandlingsansvaret for.
          </BodyLong>
          <BodyLong spacing>
            Denne personvernerklæringen er knyttet til behandlingen av
            personopplysninger på dette nettstedet. For utfyllende informasjon
            om hvordan Nav behandler dine personopplysninger, kan du lese mer i{" "}
            <Link href="https://www.nav.no/informasjonskapsler">
              Navs generelle personvernerklæring
            </Link>
            .
          </BodyLong>
          <Heading size="large" level="2" spacing data-aksel-heading-color>
            Bruk av informasjonskapsler
          </Heading>
          <BodyLong spacing>
            Når du besøker nettsiden bruker vi informasjonskapsler (cookies).
          </BodyLong>
          <BodyLong spacing>
            Informasjonskapsler er små tekstfiler som plasseres på din
            datamaskin når du laster en nettside. Noen av informasjonskapslene
            er nødvendige for at ulike tjenester på nettsiden vår skal fungere
            slik vi ønsker. Funksjonen kan slås av og på i de fleste nettlesere
            gjennom «innstillinger», «sikkerhet» eller liknende. Hvis du slår av
            informasjonskapsler i nettleseren din, vil ikke all funksjonalitet
            virke som den skal. Informasjonskapsler inneholder ikke
            personopplysninger og er ingen sikkerhetsrisiko for deg.
          </BodyLong>
          <BodyLong spacing>
            Vi bruker informasjonskapsler til å forbedre brukeropplevelsen og
            innholdet. Når du besøker aksel.nav.no, sender nettleseren din
            opplysninger til Navs analyseverktøy. For hver side du åpner, lagres
            opplysninger om hvilken side du er på, hvilken side du kommer fra og
            går til, hvilken nettleser du bruker, om du bruker PC eller mobile
            løsninger m.m. Slik kan vi forbedre flyten og opplevelsen for alle
            som bruker nettsiden.
          </BodyLong>
          <BodyLong spacing>
            Opplysningene brukes til å kartlegge hvordan og hvor mye
            aksel.nav.no brukes, uten å identifisere IP-adresser. Vi bruker
            verktøyet Umami i analysearbeidet.
          </BodyLong>

          <Heading size="medium" level="3" spacing data-aksel-heading-color>
            Bare nødvendige
          </Heading>

          <Heading size="small" level="4" spacing data-aksel-heading-color>
            pause-animations
          </Heading>
          <BodyLong spacing>
            For å huske om du har skrudd av animasjoner på forsiden.
          </BodyLong>
          <Heading size="small" level="4" spacing data-aksel-heading-color>
            aksel-theme
          </Heading>
          <BodyLong spacing>
            Husker valgt fargetema og om du har valgt å bruke mørk eller lyst
            tema.
          </BodyLong>
          <Heading size="small" level="4" spacing data-aksel-heading-color>
            aksel-example-theme
          </Heading>
          <BodyLong spacing>Husker valgt fargetema i kode-eksempler.</BodyLong>
          <Heading size="small" level="4" spacing data-aksel-heading-color>
            aksel-consent
          </Heading>

          <BodyLong spacing>
            Brukes for å huske samtykket for informasjonskapsler du har gitt
            eller avslått på aksel.nav.no. Versjonen hjelper oss med å avgjøre
            om vi må vise banneret på nytt hvis det har kommet nye cookies siden
            sist du ga ditt samtykke. Lagres til vi ber om nytt samtykke etter
            365 dager.
          </BodyLong>

          <Heading size="medium" level="3" spacing data-aksel-heading-color>
            Godkjenn alle
          </Heading>

          <BodyLong spacing>
            Ved å trykke &quot;godkjenn alle&quot; skrur vi på analyseverktøyet
            Umami.
          </BodyLong>

          <Heading size="small" level="4" spacing data-aksel-heading-color>
            Umami
          </Heading>
          <BodyLong spacing>
            Umami brukes til statistikk og analyse av hvordan nav.no brukes.
            Umami bruker ikke informasjonskapsler, men henter inn opplysninger
            om nettleseren din for å lage en unik ID. Denne ID-en brukes for å
            skille deg fra andre brukere. For å hindre identifisering, bruker vi
            en egenutviklet proxy som vasker bort deler av IP-adressen din før
            dataene sendes til verktøyet.
          </BodyLong>
          <Heading size="large" level="2" spacing data-aksel-heading-color>
            Mine valg
          </Heading>
          <ConsentForm consent={consent} />
        </PageBlock>
      </Box>
    </DsPage>
  );
}
