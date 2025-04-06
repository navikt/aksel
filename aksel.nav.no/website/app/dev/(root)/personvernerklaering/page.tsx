import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { getCookieConsent } from "@/app/_ui/consent-banner/ConsentBanner.utils";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { ConsentForm } from "../_ui/ConsentForm";
import styles from "../_ui/Root.module.css";

export const metadata = {
  title: "Personvern og sikkerhet",
  description:
    "Informasjon om hvordan Aksel behandler dine personopplysninger på aksel.nav.no.",
};

export default async function Page() {
  const consent = await getCookieConsent();

  return (
    <div className={styles.websitePage}>
      <Header />

      <main id="hovedinnhold" tabIndex={-1} className={styles.websiteMain}>
        <Heading
          level="1"
          size="xlarge"
          className={styles.websiteHeading}
          spacing
        >
          Personvern og sikkerhet på aksel.nav.no
        </Heading>
        <BodyLong spacing>
          Aksel er en nettside NAV Arbeids- og velferdsdirektoratet har
          behandlingsansvaret for.
        </BodyLong>
        <BodyLong spacing>
          Denne personvernerklæringen er knyttet til behandlingen av
          personopplysninger på dette nettstedet. For utfyllende informasjon om
          hvordan NAV behandler dine personopplysninger, kan du lese mer i{" "}
          <Link href="https://www.nav.no/informasjonskapsler">
            NAVs generelle personvernerklæring
          </Link>
          .
        </BodyLong>
        <Heading
          size="large"
          level="2"
          spacing
          className={styles.websiteHeading}
        >
          Bruk av informasjonskapsler
        </Heading>
        <BodyLong spacing>
          Når du besøker nettsiden bruker vi informasjonskapsler (cookies).
        </BodyLong>
        <BodyLong spacing>
          Informasjonskapsler er små tekstfiler som plasseres på din datamaskin
          når du laster en nettside. Noen av informasjonskapslene er nødvendige
          for at ulike tjenester på nettsiden vår skal fungere slik vi ønsker.
          Funksjonen kan slås av og på i de fleste nettlesere gjennom
          «innstillinger», «sikkerhet» eller liknende. Hvis du slår av
          informasjonskapsler i nettleseren din, vil ikke all funksjonalitet
          virke som den skal. Informasjonskapsler inneholder ikke
          personopplysninger og er ingen sikkerhetsrisiko for deg.
        </BodyLong>
        <BodyLong spacing>
          Vi bruker informasjonskapsler til å forbedre brukeropplevelsen og
          innholdet. Når du besøker aksel.nav.no, sender nettleseren din
          opplysninger til NAVs analyseverktøy. For hver side du åpner, lagres
          opplysninger om hvilken side du er på, hvilken side du kommer fra og
          går til, hvilken nettleser du bruker, om du bruker PC eller mobile
          løsninger m.m. Slik kan vi forbedre flyten og opplevelsen for alle som
          bruker nettsiden.
        </BodyLong>
        <BodyLong spacing>
          Opplysningene brukes til å kartlegge hvordan og hvor mye aksel.nav.no
          brukes, uten å identifisere IP-adresser. Vi bruker verktøyet Umami i
          analysearbeidet.
        </BodyLong>

        <Heading
          size="medium"
          level="3"
          spacing
          className={styles.websiteHeading}
        >
          Bare nødvendige
        </Heading>

        <Heading
          size="small"
          level="4"
          spacing
          className={styles.websiteHeading}
        >
          pause-animations
        </Heading>
        <BodyLong spacing>
          For å huske om du har skrudd av animasjoner på forsiden.
        </BodyLong>
        <Heading
          size="small"
          level="4"
          spacing
          className={styles.websiteHeading}
        >
          aksel-theme
        </Heading>
        <BodyLong spacing>
          Husker valgt fargetema og om du har valgt å bruke mørk eller lyst
          tema.
        </BodyLong>
        <Heading
          size="small"
          level="4"
          spacing
          className={styles.websiteHeading}
        >
          aksel-consent
        </Heading>

        <BodyLong spacing>
          Brukes for å huske samtykket for informasjonskapsler du har gitt eller
          avslått på aksel.nav.no. Versjonen hjelper oss med å avgjøre om vi må
          vise banneret på nytt hvis det har kommet nye cookies siden sist du ga
          ditt samtykke. Lagres til vi ber om nytt samtykke etter 365 dager.
        </BodyLong>

        <Heading
          size="medium"
          level="3"
          spacing
          className={styles.websiteHeading}
        >
          Godkjenn alle
        </Heading>

        <BodyLong spacing>
          Ved å trykke &quot;godkjenn alle&quot; skrur vi på analyseverktøyet
          Umami.
        </BodyLong>

        <Heading
          size="small"
          level="4"
          spacing
          className={styles.websiteHeading}
        >
          Umami
        </Heading>
        <BodyLong spacing>
          Umami brukes til statistikk og analyse av hvordan nav.no brukes. Umami
          bruker ikke informasjonskapsler, men henter inn opplysninger om
          nettleseren din for å lage en unik ID. Denne ID-en brukes for å skille
          deg fra andre brukere. For å hindre identifisering, bruker vi en
          egenutviklet proxy som vasker bort deler av IP-adressen din før
          dataene sendes til verktøyet.
        </BodyLong>
        <Heading
          size="large"
          level="2"
          spacing
          className={styles.websiteHeading}
        >
          Mine valg
        </Heading>
        <ConsentForm consent={consent} />
      </main>
      <Footer />
    </div>
  );
}
