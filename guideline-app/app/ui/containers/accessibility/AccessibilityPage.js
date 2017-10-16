import React from 'react';

import { UndertekstBold, Normaltekst, Ingress } from './../../../../../packages/node_modules/nav-frontend-typografi';
// eslint-disable-next-line import/extensions
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

import './styles.less';

const AccessibilityPage = () => (
    <div className="accessibilityPage">

        <div className="section">
            <Ingress>
                Vi vil at NAVs løsninger fungerer for alle. Unge og gamle, Norske og innvandrere, våkne og trøtte,...
                alle de som møter utfordringer daglig og de som &quot;bare sliter med noe akkurat nå&quot;.
                Vi vet at våre brukere er forskjellige og har forskjellige behov - derfor har vi gjort vårt beste
                for å designe og kode elementene i Designsystemet for folk flest. Innspill for forbedring er velkommen!
            </Ingress>
        </div>

        <div className="section">
            <UndertekstBold>Få en bra start ut av boksen</UndertekstBold>
            <Normaltekst>
                Målet er å få innebygd tilgjengelighet og universell utforming i modulene, slik at designere og
                utviklere kan konsentrere seg om brukerne, designet og koden. Det er likevel viktig at de fører
                tankegangen videre når modulene settes sammen til et nytt design.
            </Normaltekst>
        </div>

        <div className="section">
            <UndertekstBold>Hva har vi gjort?</UndertekstBold>
            <Normaltekst>
                Vi har tatt hensyn til krav til universell utforming når vi utformet og testet modulene (kravene i WCAG
                2.0, level AA). Dette gjelder for eksempel fargekontrast: Bruk de fargekombinasjonene du finner her,
                og du møter kontrastkravene.
            </Normaltekst>
            <Normaltekst>
                Designsystemet bruker standard-HTML. På denne måten kan de aller fleste lese innholdet og betjene
                elementene, også de som bruker hjelplemidler. Der standard-HTML ikke er tilstrekkelig, har vi lagt til
                WAI-ARIA. Elementene er testet med skjermleser.
            </Normaltekst>
            <Normaltekst>
                I tilknytning til hvert element finner du referanser til relaterte krav og beste praksis.
            </Normaltekst>
            <Normaltekst>
                Vær obs på at du ikke automatisk oppfyller alle krav NAV stiller til universell utforming og
                brukeropplevelse, men følger du Designsystemet, unngår du mange vanlige feil.
            </Normaltekst>
        </div>

        <div className="section">
            <UndertekstBold>Ressurser</UndertekstBold>
            <ul>
                <li>
                    <a className="lenke" href="http://uu.difi.no">
                        uu.difi.no
                    </a>
                </li>
                <li>
                    <a className="lenke" href="http://www.bbc.co.uk/gel/guidelines/how-to-design-for-accessibility">
                        BBC Gel - How to design for accessibility
                    </a>
                </li>
                <li>
                    <a className="lenke" href="https://www.microsoft.com/en-us/design/inclusive">
                        Inclusive Design at Microsoft
                    </a>
                </li>
                <li>
                    <a className="lenke" href="https://www.w3.org/Translations/WCAG20-no/">
                        Web Content Accessibility Guidelines (WCAG) 2.0
                    </a>
                </li>
            </ul>
        </div>
    </div>
);

export default AccessibilityPage;
