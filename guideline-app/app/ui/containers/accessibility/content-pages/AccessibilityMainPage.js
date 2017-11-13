import React from 'react';
// eslint-disable-next-line import/extensions, import/no-duplicates
import {
    Innholdstittel,
    Undertittel,
    Normaltekst,
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import './../styles.less';

export default function AccessibilityMainPage() {
    return (
        <div className="accessibilityPage">
            <Innholdstittel>
                NAVs designsystem skal bidra til å lage løsninger som fungerer for alle.
            </Innholdstittel>

            <div className="smallSection">
                <Ingress>
                    Mellom 15 og 20 prosent av Norges befolkning har en nedsatt funksjonsevne*.
                    Å leve med nedsatt funksjonsevne fører ofte med seg utfordringer i dagliglivet,
                    deriblant ved bruk av teknologi. Hvis vi i NAV lager løsninger som er tilgjengelig for alle,
                    bidrar vi til at de aller fleste kan klare seg selv.
                </Ingress>
            </div>

            <div className="section">
                <Normaltekst>
                    Og dette handler ikke «bare» om å lage noe som er tilgjenglig for personer med nedsatt
                    funksjonsevne.
                    Å lage en tilgjengelig løsning handler også om å lage noe som er enkelt å bruke, uansett hvor du
                    befinner deg. Tenk deg hvordan det er å bruke siden med en musearm, på mobilen ute i sollyset, i
                    støyete
                    omgivelser, når barna krever oppmerksomhet eller når du har dårlig mobildekning. Eller hvis du
                    av ulike
                    grunner sliter med synet, hørselen eller beveglighet.
                </Normaltekst>
            </div>

            <div className="smallSection">
                <Normaltekst>
                    Når vi utvikler løsningene våre, skal vi alltid ha disse tingene i bakhodet.
                </Normaltekst>
            </div>

            <iframe
                src="https://player.vimeo.com/video/119526302?title=0&byline=0&portrait=0"
                width="640"
                height="480"
                frameBorder="0"
                title="Informasjonsvideo om universell utforming av IKT (from Difi on Vimeo)"
                allowFullScreen
            />


            <div className="section">
                <Undertittel>Få en bra start ut av boksen</Undertittel>
                <Normaltekst>
                    Vi har utarbeidet moduler der tankene bak universell utforming er bakt inn for deg. Da slipper
                    du å
                    tenke på tilpasninger, men vet at du møter de kravene vi har satt og du kan konsentrere deg om
                    brukerne, designet og koden. På den måten kan du sette i gang med en gang, og skape noe nytt og
                    spennende. Men husk, du må alltid tenke på brukernes behov når du setter sammen modulene og
                    skaper nye varianter.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Hva har vi gjort for å gjøre det enklere?</Undertittel>
                <Normaltekst>
                    Vi tok hensyn til krav til universell utforming når vi utformet og testet modulene, som er
                    kravene i
                    WCAG 2.0, level AA. Dette gjelder for eksempel fargekontrast: Bruk de fargekombinasjonene du
                    finner
                    her, og du møter kontrastkravene som er satt.
                </Normaltekst>
                <div className="smallSection">
                    <Normaltekst>
                        Designsystemet bruker standard-HTML. På denne måten kan de aller fleste lese innholdet og
                        betjene
                        elementene, også de som bruker hjelplemidler. Der standard-HTML ikke er tilstrekkelig, har
                        vi lagt
                        til WAI-Aria. Elementene er testet med skjermleser.
                    </Normaltekst>
                </div>
                <div className="smallSection">
                    <Normaltekst>
                        I tilknytning til hvert element finner du referanser til relaterte krav og beste praksis.
                    </Normaltekst>
                </div>
                <div className="smallSection">
                    <Normaltekst>
                        Vær obs på at du ikke automatisk oppfyller alle krav NAV stiller til universell utforming og
                        brukeropplevelse. Men følger du designsystemet vårt, unngår du mange vanlige feil.
                    </Normaltekst>
                </div>
            </div>

            <div className="section">
                <Undertittel>Ressurser</Undertittel>
                <ul>
                    <li>
                        <a href="http://uu.difi.no" className="lenke">
                            http://uu.difi.no
                        </a>
                    </li>

                    <li>
                        <a href="https://www.w3.org/Translations/WCAG20-no/" className="lenke">
                            https://www.w3.org/Translations/WCAG20-no/
                        </a>
                    </li>
                    <li>
                        Internt i NAV:&nbsp;
                        <a
                            // eslint-disable-next-line max-len
                            href="https://confluence.adeo.no/display/MEBO/Brukskvalitet+og+universell+utforming+av+IKT"
                            className="lenke"
                        >
                            Brukskvalitet og universell utforming av IKT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
