import React from 'react';
import {
    Innholdstittel,
    Undertittel,
    Normaltekst,
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

export default function AccessibilityGuidelinePage() {
    return (
        <div>
            <div className="section">
                <Innholdstittel>Retningslinjer for å skape tilgjengelige løsninger</Innholdstittel>
                <div className="smallSection">
                    <Ingress>
                        Under utviklingen av nye sider og løsninger, er det mange ting som bidrar til å forbedre
                        brukeropplevelsen og gjør det du lager mer tilgjengelig for alle som skal bruke den.
                        Under finner du noen overordnede retningslinjer som kan hjelpe deg på veien.
                    </Ingress>
                </div>
            </div>

            <div className="section">
                <Undertittel>Behov - Tenk på brukerne og hva de trenger</Undertittel>
                <Normaltekst>
                    Vil du nå flest mulig folk med det du designer, skriver og koder, bør du tenke på hvor ulike
                    brukerne kan være. De kan like forskjellige ting, ha en forskjellig bakgrunn eller ulike evner.
                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        En nyttig måte å ta en avsjekk på kan være «bestemor-testen». Hadde bestemoren din forstått og
                        klart å bruke det du lager? Eller kanskje en person som ikke kan bruke musepekeren?
                        Eller hva med en person som blir lett distrahert?
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>Språk - Tydelighet i språket vårt skaper tillit til innholdet</Undertittel>
                <Normaltekst>
                    Byråkratisk og tungt språk er utfordrende. Mange brukere kan bli usikre og tvilende, og kanskje til
                    og med ringer for å være trygge på at de forstått det de leser riktig. Spesielt vanskelig blir det
                    for personer som ikke har norsk som morsmål, eller har andre utfordringer med å lese tekst,
                    som dyslektikere.
                </Normaltekst>
                <div className="smallSection">
                    For å møte disse behovene har NAV satt opp egne retningslinjer for hvordan skrive tekst.
                </div>
            </div>

            <div className="section">
                <Undertittel>
                    Fargebruk - Har en hensikt, men kan ikke være det eneste brukeren støtter seg på
                </Undertittel>
                <Normaltekst>
                    Farger kan gjerne brukes for å gjøre innholdet lettere å forstå, men pass på at fargen ikke er det
                    eneste virkemiddelet du bruker for å oppnå det du vil. Da er det veldig mange som kommer til å slite
                    med å få med seg denne informasjonen. For eksempel personer som har dårlig fargesyn, svaksynte
                    og blinde, personer som sitter foran en dårlig kalibrert skjermeller en dårlig projektor.
                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Dårlige projektorer eller mobiler ute i sollys byr også en annen utfordring: Brukes det
                        farger som har for dårlig kontrast, blir det vanskelig å lese teksten. Fargekombinasjonene
                        som brukes i designsystemet har god nok kontrast for å fungere også i slike settinger,
                        og møter kravene i forskriften om universell utforming.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>
                    Bilder og video - Bidra til at alle får med seg innholdet
                </Undertittel>
                <Normaltekst>
                    Mange brukere har stor nytte av bilder, grafer og videoer. De hjelper ofte med å gjøre innholdet
                    lettere å forstå og huske, spesielt for personer med kognitive utfordringer.

                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Men husk: Har man ikke god nok mobildekning for å laste ned bilder eller videoer, eller av
                        andre grunner ikke kan se siden i det hele tatt, trenger man litt hjelp til å kunne få med
                        seg innholdet. Dette kan enkelt løses ved å legge inn en alternativ tekst på bildene som
                        beskriver det bildene skal formidle (mer om dette på Difi.no, der du også kan ta et&nbsp;
                        <a
                            className="lenke"
                            // eslint-disable-next-line max-len
                            href="https://uu.difi.no/krav-og-regelverk/kom-i-gang/e-laeringskurs-om-universell-utforming-av-nettinnhold/"
                        >
                            Elæringskurs om universell utforming
                        </a>).
                        For mer komplekse illustrasjoner eller videoer bør det finnes en beskrivende tekst som
                        oppsummerer hovedpoengene. Denne teksten kan være nyttig for mange, så gjør den gjerne
                        synlig for alle som besøker siden eller løsningen.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>
                    Semantisk kode - Tilgjengliggjør innholdet for flere
                </Undertittel>
                <Normaltekst>
                    Et tydelig, visuelt hierarki, med avsnitt, overskrifter og lenker gjør det letter for brukerne å
                    orientere seg på siden. Innholdet blir lettere å skanne, og brukerne kan lettere finne det de
                    leter etter.

                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Det samme gjør en god semantisk kode for de som bruker hjelpemidler. Da blir elementene som
                        visuelt strukturerer siden også representert i koden. Dette gjør at for eksempel
                        skjermleserbrukere får de samme «knaggene» for forstå oppbygging av siden og navigere
                        seg rundt på den. Samtidig blir siden lettere å skanne og indeksere for «verdens mest
                        innflytelsesrike blinde bruker»: Google.
                    </Normaltekst>
                </div>

                <div className="smallSection">
                    <Normaltekst>
                        Bruk derfor HTML-elementene bevisst, også de nye i HTML5. Som for eksempel main, header,
                        footer, article og nav. Og koder du overskrifter som overskrifter (med h1 til h6),
                        så kan skjermleserbrukere navigere mellom dem og få en oversikt over siden -
                        akkurat som med en innholdsfortegnelse. Det betyr også at du da ikke skal hoppe over
                        overskriftsnivåer bare for å oppnå det visuelle uttrykket du ønsker - bruk heller CSS for dette.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>
                    WAI-Aria - Så mye som nødvendig, så lite som mulig
                </Undertittel>
                <Normaltekst>
                    I noen tilfeller er HTML-elementene ikke beskrivende nok. Når man for eksempel får opp en
                    feilmelding, så er den ofte tydelig for de som ser. Men synshemmede trenger en varsling om det.
                    Her kan det settes til aria-varslinger, som gjør at feilmeldingen annonseres til brukeren.
                    WAI-Aria er også en fin måte å formidle til skjermleserbrukere om et ekspanderbart felt er
                    åpen eller lukket.
                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Prøv alltid å løse utfordringen med HTML først, og bruk WAI-Aria kun når
                        HTML ikke er tilstrekkelig.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>
                    Tastaturnavigasjon - Alt skal fungere kun med et tastatur
                </Undertittel>
                <Normaltekst>
                    Brukerne våre skal kunne betjene all type innhold og funksjonalitet på sidene våre kun ved hjelp
                    av et tastatur. Dette er essensielt for skjermleserbrukere og mennesker som ikke kan bruke
                    musepeker på grunn av motoriske utfordringer. Men det er også viktig for superbrukere som
                    foretrekker tastatur, personer med «musearm», eller personer som av ulike grunner ikke kan
                    bruke en mus.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>
                    Fokusmarkering og leserekkefølge - Vær tydelig
                </Undertittel>
                <Normaltekst>
                    Bruker man tastatur for å navigere, er det essensielt at man ser hvor man er. Tar man ikke noe
                    aktivt valg her, brukes det en markering nettleseren setter, som ofte er vanskelig å se. Hjelp
                    brukerne med en tydelig fokusmarkering. I NAV bruker vi en gul outline eller gul bakgrunn,
                    avhengig av elementet.
                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Når du bruker tabulator-tasten for å navigere deg gjennom siden, hopper du fra interaktivt
                        element til interaktivt element. Interaktive elementer er for eksempel knapper, lenker og
                        skjemafelt. Rekkefølgen de vises i bestemmes av hvordan siden er bygget opp i koden. Ideelt
                        sett er dette samme rekkefølge som den visuelle leserekkefølgen, men det kan være avvik.
                        Hvis det blir dårlig sammenheng mellom den visuelle rekkefølgen og rekkefølgen elementene
                        når man bruker tab, blir det vanskelig for brukeren å henge med, selv om fokusmarkeringen
                        er bra.
                    </Normaltekst>
                </div>
                <div className="smallSection">
                    <Normaltekst>
                        Fokuset skal aldri flyttes uforventet eller havne ulogiske steder når man navigerer på siden.
                        Tenk for eksempel at du er inne i en lang søknadsdialog, og så trykker du på en knapp som åpner
                        et modalvindu. Når du er ferdig med modalvinduet, hvor bør fokuset havne? I starten av siden,
                        der du må navigere deg nedover igjen for å finne stedet du var da du åpnet modalvinduet?
                        Eller på selve knappen som åpnet modalvinduet?
                        Det å måtte lete etter riktig sted er irriterende for alle, men ekstra vanskelig for
                        personer som ikke ser siden eller som har motoriske eller kognitive utfordringer.
                    </Normaltekst>
                </div>
            </div>
        </div>
    );
}
