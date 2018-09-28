import React from 'react';
import {
    Undertittel,
    Normaltekst,
    Ingress,
    Element
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import {
    AlertStripeSuksess,
    AlertStripeAdvarsel
} from './../../../../../../packages/node_modules/nav-frontend-alertstriper';

import './styles.less';

export default function HowWeWrite() {
    return (
        <div className="howWeWritePage">
            <div className="section">
                <Ingress>
                    NAVs tekster leses av alle lag av befolkningen i alle mulige slags situasjoner.
                    Derfor må tekstene våre være utformet slik at de er lett å forstå.
                    På Navet finner du retningslinjene&nbsp;
                    <a
                        className="lenke"
                        // eslint-disable-next-line
                        href="https://navet.adeo.no/ansatt/Etatstjenester/Stottefunksjoner/Kommunikasjon/Sprak/Retningslinjer/spr%C3%A5klige-retningslinjer-for-nav"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Slik skriver vi i NAV.
                    </a>
                    &nbsp;De hjelper deg å skrive klart og tydelig.
                </Ingress>
            </div>

            <div className="section">
                <Undertittel>
                    Følg retningslinjene våre
                </Undertittel>
                <Normaltekst>
                    Vi har utarbeidet egne retningslinjer for hvordan vi skal skrive. Disse retningslinjene tar
                    utgangspunkt i Klarspråk fra Språkrådet. Merk deg at der klarspråkstandarden har flere
                    alternative skrivemåter,  som for eksempel datoer og klokkeslett, peker retningslinjene våre
                    ut én bestemt måte å skrive på basert på vår og brukerne våres kontekst.
                </Normaltekst>

                <Undertittel>
                    Brukertest tekster når det er mulig
                </Undertittel>
                <Normaltekst>
                    I den grad det er praktisk og økonomisk mulig, skal tekster som er rettet mot eksterne brukere
                    brukertestes. (Kilde: NAVs språklige retningslinjer) Da kan du bruke mikrotesting.
                    Dette er er en enkel, effektiv og lite ressurskrevende måte å teste budskap og kortere
                    tekster på.
                </Normaltekst>

                <Undertittel>
                    1. Alle tekster har et formål – vær bevisst på hva du vil formidle
                </Undertittel>
                <Normaltekst>
                    Hva er hovedbudskapet i teksten?<br />
                    Hva slags konsekvenser kan teksten få for leseren?<br />
                    Skal leseren gjøre noe som følge av teksten?
                </Normaltekst>
                <ul>
                    <li>Hva skal han/hun gjøre?</li>
                    <li>Hvordan skal han/hun gjøre det?</li>
                    <li>Når skal han/hun gjøre det?</li>
                </ul>
            </div>

            <div className="section">
                <Undertittel>2. Vi inkluderer leseren</Undertittel>
                <Element tag="h3">2.1 Bruk aktive setninger</Element>
                <Normaltekst>
                    I en aktiv setning er det ikke tvil om hvem som gjør hva eller
                    hvem som har ansvaret.
                    Når vi bruker ordene du, vi eller NAV som subjekt i setningen,
                    blir den automatisk aktiv.
                </Normaltekst>

                <AlertStripeSuksess>
                    Stortinget har vedtatt nye regler for alderspensjon.
                </AlertStripeSuksess>
                <AlertStripeAdvarsel>
                    Nye regler for alderspensjon er vedtatt.
                </AlertStripeAdvarsel>

                <div className="section">
                    <Element tag="h3">2.2 Bruk ord folk forstår</Element>
                    <Normaltekst>
                        Unngå å bruke ord du ikke ville brukt muntlig.
                    </Normaltekst>

                    <AlertStripeSuksess>
                        Ubehandlede saker
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Restanser
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.3 Forklar faguttrykk</Element>
                    <Normaltekst>
                        Hvis det er nødvendig å bruke et faguttrykk,
                        bruker du ord fra allmennspråket til å forklare hva det betyr.
                    </Normaltekst>

                    <AlertStripeSuksess>
                        En aktivitetsplan beskriver hva som skal til for at du skal komme i arbeid.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Aktivitetsplan
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.4 Unngå stammespråk</Element>
                    <Normaltekst>
                        Interne ord og begreper er vanskelig å forstå for utenforstående.
                        Erstatt dem med ord folk kjenner.
                    </Normaltekst>

                    <AlertStripeSuksess>
                        Være registrert hos NAV
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Stå tilmeldt NAV
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.5 Unngå forkortelser</Element>
                    <Normaltekst>
                        Skriv ordene helt ut.
                    </Normaltekst>

                    <div className="dosAndDontsAside">
                        <AlertStripeAdvarsel>
                            f.eks.
                        </AlertStripeAdvarsel>
                        <AlertStripeSuksess>
                            for eksempel
                        </AlertStripeSuksess>
                    </div>

                    <div className="dosAndDontsAside">
                        <AlertStripeAdvarsel>
                            f.nr.
                        </AlertStripeAdvarsel>
                        <AlertStripeSuksess>
                            fødselsnummer
                        </AlertStripeSuksess>
                    </div>

                    <div className="dosAndDontsAside">
                        <AlertStripeAdvarsel>
                            APS
                        </AlertStripeAdvarsel>
                        <AlertStripeSuksess>
                            arbeidspraksis i skjermet virksomhet
                        </AlertStripeSuksess>
                    </div>
                </div>

                <div className="section">
                    <Element tag="h3">2.6 Skriv du og dere til brukerne</Element>
                    <Normaltekst>
                        Henvend deg direkte til leseren. Unngå å omtale han
                        eller henne i tredjeperson.
                    </Normaltekst>

                    <AlertStripeSuksess>
                        Hvis du vil klage på vedtaket, må du sende skriftlig melding til NAV innen tre uker.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Vil søkeren klage på vedtaket, må han/hun sende skriftlig melding innen tre uker.
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.7 Skriv dere til bedrifter og virksomheter</Element>
                    <Normaltekst>
                        Når du skriver til bedrifter, virksomheter og andre institusjoner
                        bruker du &quot;dere&quot;. Det er også greit å variere med navnet på
                        virksomheten, spesielt når du har behov for å være tydelig på
                        ansvar og roller.
                    </Normaltekst>
                    <Normaltekst>
                        Eksempel på brev til arbeidsgivere:
                    </Normaltekst>
                    <ul>
                        <li>
                            Har dere oppgitt for høyt timetall i a-meldingen?
                        </li>
                        <li>
                            Dere mottar dette brevet fordi vi antar at dere har rapportert feil
                            antall timer utbetalt som timelønn. Vi oppfatter antallet som
                            svært høyt og ber dere derfor kontrollere opplysningene dere
                            finner i vedlegget.
                        </li>
                    </ul>
                </div>

                <div className="section">
                    <Element tag="h3">
                        2.8 Vi skriver navnet på brukeren og varierer med han og hun i notater om brukeren
                    </Element>
                    <Normaltekst>
                        Notater og meldinger i fagsystemene blir synlige for brukerne på nav.no. Ved å være
                        bevisst på å bruke navn, vil brukerne kjenne seg bedre igjen i tekstene.
                    </Normaltekst>
                    <AlertStripeSuksess>
                        Veilederen ved Itas har ringt oss. Han opplyste at [navn] har store fysiske begrensninger.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Veileder ved Itas ringte. Han opplyser at bruker har store begrensninger i fysikk.
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.9 Vi skriver jeg og vi i notater og meldinger</Element>
                    <AlertStripeSuksess>
                        Jeg har oppdaget i etterkant at «navn» har tre barn. Det betyr at vi har oversett
                        barnetillegg for det tredje barnet.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        j har i etterkant oppdaget at brukeren har 3 barn, har da oversett barnetillegg
                        for 3. barn.
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">2.10  Varier mellom vi og NAV</Element>
                    <Normaltekst>
                        Det skal være enkelt for leseren å se at NAV er avsender av teksten.
                        Derfor bruker vi navnet NAV tidlig i teksten,
                        og varierer deretter mellom vi og NAV.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>3. Tekstens struktur</Undertittel>

                <div className="section">
                    <Element tag="h3">3.1 Skriv det viktigste allerede i innledningen</Element>
                    <AlertStripeSuksess>
                        Stønaden din til barnetilsyn blir økt fra 1 540 kroner til 2 030 kroner per måned fra 1. mai
                        2012. Dette har Stortinget vedtatt.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Stortinget har vedtatt nye regler om stønad til barnetilsyn. Reglene trer i kraft fra 1. mai
                        2012. Dette fører til at stønaden blir endret.
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">3.2 Hva kan vi unnlate å si, og når må vi forklare og utdype?</Element>
                    <Normaltekst>
                        Du skal aldri skrive mer enn det leseren trenger å vite. Når det er nødvendig må du forklare
                        og utdype, selv om det betyr at teksten blir lengre. Ofte er det bare noen ekstra ord som skal
                        til. Skriv alltid fullstendige setninger i løpende tekst.
                    </Normaltekst>

                    <AlertStripeSuksess>
                        Du må legge ved dokumentasjon som viser hvor stor inntekt du har.
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Vedlegg: Dokumentasjon på inntekt.
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">3.3 Overskrifter</Element>
                    <Normaltekst>
                        En overskrift skal være informativ og beskrive innholdet
                        så konkret som mulig.
                    </Normaltekst>

                    <Normaltekst>Rettskriving i overskrifter</Normaltekst>
                    <ul>
                        <li>Overskrifter skal aldri ha punktum.</li>
                        <li>Den første bokstaven skal være stor, resten små.</li>
                        <li>Vi kan bruke spørsmålstegn, men ikke utropstegn.</li>
                        <li>Overskrifter skal skrives i fet skrift</li>
                    </ul>

                    <AlertStripeSuksess>
                        NAV har innvilget søknaden din om foreldrepenger
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Foreldrepenger ved fødsel – melding om vedtak
                    </AlertStripeAdvarsel>
                </div>

                <div className="section">
                    <Element tag="h3">3.4 Mellomtitler</Element>
                    <Normaltekst>
                        Mellomtitler gjør det lettere for den som skriver teksten å sortere innholdet,
                        og gjør det lettere for leseren å orientere seg i teksten. All tekst over en
                        halv side skal ha mellomoverskrifter.
                    </Normaltekst>
                    <Normaltekst>
                        Rettskriving i mellomtitler
                    </Normaltekst>
                    <ul>
                        <li>Mellomtitler skal aldri ha punktum.</li>
                        <li>Den første bokstaven skal være stor, resten små.</li>
                        <li>Vi kan bruke spørsmålstegn, men ikke utropstegn.</li>
                        <li>Mellomtitler skal være beskrivende for innholdet.</li>
                        <li>Mellomtitler skal skrives i fet skrift.</li>
                    </ul>
                </div>

                <div className="section">
                    <Element tag="h3">3.5 Del teksten inn i avsnitt</Element>
                    <Normaltekst>
                        Når teksten er delt inn i avsnitt er et lettere å se hvilke argumenter og
                        opplysninger som hører sammen. Når teksten deles opp i avsnitt,
                        blir den også lettere å lese. Du lager avsnitt ved å hoppe over en linje,
                        ikke ved å lage innrykk.
                    </Normaltekst>
                </div>

                <div className="section">
                    <Element tag="h3">3.6 Punktlister skaper god oversikt</Element>
                    <Normaltekst>
                        Bruk punktlister ved oppramsing og oversikt over ulike alternativer.
                        Sett dem opp slik:
                    </Normaltekst>
                    <ul>
                        <li>
                            Når punktene ikke er fullstendige setninger, skal de ha
                            liten forbokstav og ikke punktum til slutt. Innledningsteksten
                            skal ikke avsluttes med kolon.
                        </li>
                        <li>
                            Når punktene er fullstendige setninger, skal det være
                            storforbokstav i det første ordet og punktum til slutt i hvert punkt.
                            Innledningsteksten skal ha kolon.
                        </li>
                        <li>
                            I gode punktlister har alle punktene samme form og struktur,
                            for eksempel enkeltord, substantivuttrykk, leddsetninger eller
                            hele setninger. De bør også henge sammen innholdsmessig.
                        </li>
                    </ul>
                </div>

                <div className="section">
                    <Element tag="h4">Eksempler:</Element>
                    <Normaltekst>
                        Fra arbeidsfeltet nevner vi
                    </Normaltekst>
                    <ul>
                        <li>barnevern</li>
                        <li>alkoholspørsmål</li>
                        <li>eldreomsorg</li>
                        <li>sosialpolitiske saker</li>
                    </ul>
                    <Normaltekst>
                        Konsekvent punktliste der alle punktene har samme språklige form (verb i presens)
                    </Normaltekst>
                    <AlertStripeSuksess>
                        Du
                        <ul className="listNoMargin">
                            <li>
                                liker å jobbe
                            </li>
                            <li>
                                er målbevisst og engasjert
                            </li>
                            <li>
                                inspirerer og er et godt forbilde
                            </li>
                        </ul>
                    </AlertStripeSuksess>
                    <AlertStripeAdvarsel>
                        Du
                        <ul className="listNoMargin">
                            <li>
                                liker å jobbe
                            </li>
                            <li>
                                målbevisst og engasjert
                            </li>
                            <li>
                                inspirasjon og et godt forbilde
                            </li>
                        </ul>
                    </AlertStripeAdvarsel>
                </div>
            </div>
        </div>
    );
}
