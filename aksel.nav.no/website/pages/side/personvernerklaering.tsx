import NextLink from "next/link";
import React from "react";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";

const Page = () => {
  return (
    <>
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
                  href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten"
                >
                  NAVs generelle personvernerklæring
                </Link>
                .
              </BodyLong>
              <Heading size="large" level="2" className="mb-4">
                Bruk av informasjonskapsler (cookies)
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
                verktøyet Amplitude i analysearbeidet.
              </BodyLong>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
