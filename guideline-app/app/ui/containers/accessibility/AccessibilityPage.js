import React from 'react';

import { Systemtittel, Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import { SectionTitle } from './../../../ui/components/section-title/SectionTitle';

import './styles.less';

export class AccessibilityPage extends React.Component {
    render() {
        return (
            <div className="accessibilityPage">

                <SectionTitle title="Innebygd tilgjengelighet og universell utforming" />

                <div className="section">
                    <Systemtittel>Lag noe som fungerer for alle</Systemtittel>
                    <Normaltekst>
                        Vi vil at NAVs løsninger fungerer for alle. Unge og gamle, Norske og innvandrere, våkne og trøtte,...
                        alle de som møter utfordringer daglig og de som "bare sliter med noe akkurat nå".
                    </Normaltekst>
                    <Normaltekst>
                        Vi vet at våre brukere er forskjellige og har forskjellige behov - derfor har vi gjort vårt beste
                        for å designe og kode elementene i Designsystemet for folk flest. Innspill for forbedring er velkommen!
                    </Normaltekst>
                </div>

                <div className="section">
                    <Systemtittel>Få en bra start ut av boksen</Systemtittel>
                    <Normaltekst>
                        Målet er å få innebygd tilgjengelighet og universell utforming i modulene, slik at designere og utviklere
                        kan konsentrere seg om brukerne, designet og koden. Det er likevel viktig at de fører tankegangen videre
                        når modulene settes sammen til et nytt design.
                    </Normaltekst>
                </div>

                <div className="section">
                    <Systemtittel>Hva har vi gjort?</Systemtittel>
                    <Normaltekst>
                        Vi har tatt hensyn til krav til universell utforming når vi utformet og testet modulene (kravene i WCAG 2.0, level AA).
                        Dette gjelder for eksempel fargekontrast: Bruk de fargekombinasjonene du finner her, og du møter kontrastkravene.
                    </Normaltekst>
                    <Normaltekst>
                        Designsystemet bruker standard-HTML. På denne måten kan de aller fleste lese innholdet og betjene elementene,
                        også de som bruker hjelplemidler. Der standard-HTML ikke er tilstrekkelig, har vi lagt til WAI-ARIA.
                        Elementene er testet med skjermleser.
                    </Normaltekst>
                    <Normaltekst>
                        I tilknytning til hvert element finner du referanser til relaterte krav og beste praksis.
                    </Normaltekst>
                    <Normaltekst>
                        Vær obs på at du ikke automatisk oppfyller alle krav NAV stiller til universell utforming og brukeropplevelse,
                        men følger du Designsystemet, unngår du mange vanlige feil.
                    </Normaltekst>
                </div>

                <div className="section">
                    <Systemtittel>Top tips for designere</Systemtittel>
                    <ol>
                        <li>Brukertest hyppig, også med personer som bruker hjelpemidler eller har kognitive utfordringer</li>
                        <li>Design en meningsfullt rekkefølge – hvordan presenteres ting når man slår av CSSen eller skjermene er mindre?</li>
                        <li>Husk at ikke alle kan bruke alle sanser</li>
                        <ul>
                        <li>Ha tekstalternativer til bilder, grafer, kart, video,… Hvis det bli lengre tekster, ikke skjul dem i koden, men la dem være synlig for alle</li>
                        <li>Fargeblinde kan misforstå hvis informasjon bare baserer seg på farge, som streker i grafer o.l.</li>
                        <li>Unngå formuleringer som forutsetter at du kan se oppsettet på skjermen – som «bildet til høyre» e.l.</li>
                        <li>Ikke bruk bilde av tekst</li>
                        </ul>
                        <li>Vær obs på navigasjon</li>
                        <ul>
                        <li>Sørg for at brukeren kan navigere på flere måter (meny, søk, a-å-lenker, lenker mellom alle sider på nettstedet)</li>
                        <li>Ha beskrivende sidetitler (på nav.no: «hovedinnhold – www.nav.no»)</li>
                        <li>Ha en klikkbar brødsmulesti</li>
                        <li>Ha en klikkbar framdriftsindikator i skjemaer</li>
                        </ul>
                        <li>Vær tydelig</li>
                        <ul>
                        <li>Beskrivende overskrifter og ledetekster</li>
                        <li>Lenker som sier tydelig hvor de lenker til</li>
                        <li>Ha hjelpetekster der det er hensiktsmessig</li>
                        <li>Vis tydelig hva som er klikkbar</li>
                        </ul>
                        <li>Vær konsekvent. Bruk de samme designelementene for å oppnå samme på på tvers av sider og løsninger.</li>
                        <li>Husk å lage gode feilmeldinger. De skal være enkle å forstå og ikke bare være en teknisk beskrivelse av hva som har gått galt. Design og kode skal følge Designsystemet.</li>
                    </ol>
                </div>

                <div className="section">
                    <Systemtittel>Top tips for utviklere</Systemtittel>
                    <p>
                    Mye bør fungere hvis du følger Designsystemet. Følgende liste er ikke uttømmende, men viser de viktigste tingene som er lurt å sjekke hyppig.</p>
                    <ol>    
                    <li>Fungerer alt med tastatur?</li>
                    <ul>
                        <li>Du kan nå og betjene alle interaktive elementer kun med tastatur (knapper, lenker, radiobokser,…)</li>
                        <li>Siden har hoppe-over-blokker ("hopp til hovedmeny" og "hopp til hovedinnhold"). Disse blir synlige når man tab-er gjennom siden.</li>
                        <li>Man ser tydelig hvor man er når man bruker tastatur for å navigere. Fokusmarkeringen er en gul ramme (se //lenke til siden//)</li>
                        <li>Siden er kodet i en logisk rekkefølge, og tab-rekkefølgen følger den visuelle rekkefølgen.</li>
                        <li>Hjelpemidler får med seg når elementer er åpent eller lukket (for eksempel lameller) og lukker man et element, så er man på samme sted som man var da man åpnet elementet</li>
                        <li>Ting endrer seg ikke bare fordi de får fokus</li>
        </ul>                
        
        <li>Semantisk kode - ting er kodet som det de ser ut som og koden er godt strukturert</li>
        <ul>     
        <li>Overskrifter er kodet som overskrifter og er på riktig nivå</li>
                        <li>Unngå å style lenker som knapper og omvendt. //lenke til riktig side i Designsystemet//</li>
                        <li>Tabeller er kodet som tabeller, th har scope //når vi har tabeller inne i Designsystemet lenke til selve siden//</li>
                        <li>Lister er kodet som lister</li>
                        <li>Bruk sections/articles der det er hensiktsmessig</li>
        </ul>               
        
        <li>Skjemaelementer</li>
        <ul>
                        <li>Labels er riktig knyttet til skjemaelementet</li>
                        <li>Elementene har tydelige ledetekster</li>
                        <li>Nedtrekkslister har et nøytralt valg</li>
                        <li>Skjemaer har en navigerbar stegoversikt</li>
        </ul>                
        <li>Feilhåndtering</li>
        <ul>
                        <li>Sider som kan ha maks én feil får inline-feilvalidering. Valideringen får aria-varsel.</li>
                        <li>Sider/bolker der det kan oppstå flere feil skal ha en feiloppsummeringsboks. Boksen skal få fokus og aria-varsel.</li>
                        <li>Brukeren får forslag til hvordan feilen kan rettes</li>
        </ul>              
        <li>Har du testet med skjermleser?</li>
        <ul>               
        <li>
                            Alle MAC og iPhone har en innebygd skjermleser, VoiceOver
                            <a href="https://www.paciellogroup.com/blog/2013/05/testing-and-debugging-ios-accessibility-for-voiceover/">
                                , Testing and debugging iOS Accessibility for voiceover
                            </a>
                            <a href="http://webaim.org/articles/voiceover/">, Om Voiceover</a>
                            <a href="http://usabilitygeek.com/10-free-screen-reader-blind-visually-impaired-users/">
                                , Det finnes også gratis skjermleser for andre plattformer.
                            </a>
                        </li>
                        <li>For eksperttesting kontakt team Brukeropplevelse (brukeropplevelse@nav.no).</li>
                    </ul>
        </ol>
                </div>

                <div className="section">
                    <Systemtittel>Annet</Systemtittel>
                    <li>Riktig språkkode i headeren</li>
                    <li>Entydig og beskrivende sidetittel (på nav.no: «hovedinnhold – www.nav.no»)</li>
                </div>

                <div className="section">
                    <Systemtittel>Ressurser</Systemtittel>
                    <ul>
                        <li>http://uu.difi.no</li>
                        <li>http://www.bbc.co.uk/gel/guidelines/how-to-design-for-accessibility</li>
                        <li>https://www.microsoft.com/en-us/design/inclusive</li>
                        <li>https://www.w3.org/Translations/WCAG20-no/</li>
                    </ul>
                </div>
            </div>);
    }
}
