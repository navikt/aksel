import Head from "next/head";
import NextLink from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import {
  BodyLong,
  Button,
  Heading,
  Link,
  Radio,
  RadioGroup,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import useConsent from "@/web/useConsent";

type TRACKING_CHOICES = "tracking_yes" | "tracking_no" | "";

const Page = () => {
  const [userPreference, setUserPreference] = useState<TRACKING_CHOICES>("");
  const { consent, updateConsent } = useConsent();

  const handleChange = (event: TRACKING_CHOICES) => {
    setUserPreference(event);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);

    if (data.get("acceptedTracking") === "tracking_yes") {
      updateConsent("accepted");
    } else if (data.get("acceptedTracking") === "tracking_no") {
      updateConsent("rejected");
    }
  };

  useEffect(() => {
    switch (consent) {
      case "accepted":
        setUserPreference("tracking_yes");
        break;
      case "rejected":
        setUserPreference("tracking_no");
        break;
      case "undecided":
      default:
        setUserPreference("");
        break;
    }
  }, [consent]);

  return (
    <>
      <Head>
        <title>Personvern og Sikkerhet på aksel.nav.no</title>
      </Head>
      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel group/aksel min-h-screen bg-surface-subtle pb-16 pt-[8vw] focus:outline-none sm:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading level="1" size="xlarge" className="mt-1">
              Personvern og sikkerhet på aksel.nav.no
            </Heading>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            <div className="dynamic-wrapper-prose">
              <BodyLong spacing>
                Aksel er en nettside NAV Arbeids- og velferdsdirektoratet har
                behandlingsansvaret for.
              </BodyLong>
              <BodyLong spacing>
                Denne personvernerklæringen er knyttet til behandlingen av
                personopplysninger på dette nettstedet. For utfyllende
                informasjon om hvordan NAV behandler dine personopplysninger,
                kan du lese mer i{" "}
                <Link
                  as={NextLink}
                  href="https://www.nav.no/informasjonskapsler"
                >
                  NAVs generelle personvernerklæring
                </Link>
                .
              </BodyLong>
              <Heading size="large" level="2" spacing>
                Bruk av informasjonskapsler
              </Heading>
              <BodyLong spacing>
                Når du besøker nettsiden bruker vi informasjonskapsler
                (cookies).
              </BodyLong>
              <BodyLong spacing>
                Informasjonskapsler er små tekstfiler som plasseres på din
                datamaskin når du laster ned en nettside. Noen av
                informasjonskapslene er nødvendige for at ulike tjenester på
                nettsiden vår skal fungere slik vi ønsker. Funksjonen kan slås
                av og på i de fleste nettlesere gjennom «innstillinger»,
                «sikkerhet» eller liknende. Hvis du slår av informasjonskapsler
                i nettleseren din, vil ikke all funksjonalitet virke som den
                skal. Informasjonskapsler inneholder ikke personopplysninger og
                er ingen sikkerhetsrisiko for deg.
              </BodyLong>
              <BodyLong spacing>
                Vi bruker informasjonskapsler til å forbedre brukeropplevelsen
                og innholdet. Når du besøker aksel.nav.no, sender nettleseren
                din opplysninger til NAVs analyseverktøy. For hver side du
                åpner, lagres opplysninger om hvilken side du er på, hvilken
                side du kommer fra og går til, hvilken nettleser du bruker, om
                du bruker PC eller mobile løsninger m.m. Slik kan vi forbedre
                flyten og opplevelsen for alle som bruker nettsiden.
              </BodyLong>
              <BodyLong spacing>
                Opplysningene brukes til å kartlegge hvordan og hvor mye
                aksel.nav.no brukes, uten å identifisere IP-adresser. Vi bruker
                verktøyet Umami i analysearbeidet.
              </BodyLong>

              <Heading size="medium" level="3" spacing>
                Bare nødvendige
              </Heading>

              <Heading size="small" level="4" spacing>
                pause-animations
              </Heading>
              <BodyLong spacing>
                For å huske om du har skrudd av animasjoner på forsiden.
              </BodyLong>
              <Heading size="small" level="4" spacing>
                aksel-consent
              </Heading>

              <BodyLong spacing>
                Brukes for å huske samtykket for informasjonskapsler du har gitt
                eller avslått på aksel.nav.no. Versjonen hjelper oss med å
                avgjøre om vi må vise banneret på nytt hvis det har kommet nye
                cookies siden sist du ga ditt samtykke. Lagres til vi ber om
                nytt samtykke etter 365 dager.
              </BodyLong>

              <Heading size="medium" level="3" spacing>
                Godkjenn alle
              </Heading>

              <BodyLong spacing>
                Ved å trykke &quot;godkjenn alle&quot; skrur vi på
                analyseverktøyet Umami.
              </BodyLong>

              <Heading size="small" level="4" spacing>
                Umami
              </Heading>
              <BodyLong spacing>
                Umami brukes til statistikk og analyse av hvordan nav.no brukes.
                Umami bruker ikke informasjonskapsler, men henter inn
                opplysninger om nettleseren din for å lage en unik ID. Denne
                ID-en brukes for å skille deg fra andre brukere. For å hindre
                identifisering, bruker vi en egenutviklet proxy som vasker bort
                deler av IP-adressen din før dataene sendes til verktøyet.
              </BodyLong>

              <div className="rounded-md border border-border-subtle bg-[#ecedef] p-6">
                <Heading size="large" level="2" spacing>
                  Mine valg
                </Heading>
                <form onSubmit={submitForm}>
                  <RadioGroup
                    className="mb-4"
                    legend="Velg hvilke informasjonskapsler du vil lagre på aksel.nav.no"
                    onChange={handleChange}
                    value={userPreference}
                    name="acceptedTracking"
                  >
                    <Radio value="tracking_no">Bare nødvendige</Radio>
                    <Radio value="tracking_yes">Godkjenn alle</Radio>
                  </RadioGroup>
                  <Button type="submit">Lagre</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
