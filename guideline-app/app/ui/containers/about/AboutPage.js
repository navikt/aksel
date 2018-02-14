import React from 'react';
import {
    Ingress,
    Normaltekst,
    Sidetittel,
    Undertittel
} from './../../../../../packages/node_modules/nav-frontend-typografi';
import designUtviklingPng from './../../../assets/images/about/designutvikling.png';
import './styles.less';

const AboutPage = () => (
    <div className="aboutPage">
        <div className="aboutPage__header">
            <img src={designUtviklingPng} alt="design-samarbeid" />
        </div>
        <div className="aboutPage__content">
            <Sidetittel>NAV Designsystem</Sidetittel>
            <div className="smallSection">
                <Ingress>
                    NAV skal være enhetlig og tydelig i det vi kommuniserer. Profil og design er en stor del av vår
                    identitet, og derfor har vi samlet verktøy og metodikk på ett sted for å gjøre det litt enklere for
                    oss som jobber i NAV.
                </Ingress>
                <Ingress className="smallSection">
                    For å jobbe mer effektivt, og skape en gjenkjennbarhet, ønsker vi en stor grad av gjenbruk av
                    design, kode og prinsipper for brukeropplevelse.
                </Ingress>
                <Ingress className="smallSection">
                    Designsystemet vårt baserer seg på fire viktige områder: NAVs profil, verktøy, metodikk og
                    samhandling
                </Ingress>
            </div>

            <div className="section">
                <Undertittel>NAVs profil</Undertittel>
                <Normaltekst>
                    Verktøykassen vår består av visuelle elementer som bidrar til å kommunisere at NAV er avsender.
                    Her kan man finne fargepaletten, hvordan vi bygger opp layoutene våre på nett, typografi,
                    ikon- og illustrasjonsbibliotek.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Verktøy</Undertittel>
                <Normaltekst>
                    NAV har sitt eget frontend-rammeverk som vi kaller for NAV Frontend. Her er oversikten på
                    komponentene som finnes der, perfekt for et utgangspunkt i design og gjenbruk av CSS.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Metodikk</Undertittel>
                <Normaltekst>
                    En viktig del av det å skape en helhetlig brukeropplevelse, er å starte fra de samme prinsippene.
                    Dette gjelder designprinsippene våre, den praksisen vi har for å skrive klart og tydelig, og
                    ikke minst prinsipper for tilgjengelighet.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Samhandling</Undertittel>
                <Normaltekst>
                    Systemet skal bidra til samhandling, og er laget for de menneskene som jobber sammen i NAV for å
                    løse utfordringene vi møter på. Ta gjerne kontakt med oss for mer informasjon om hvordan vi kan
                    starte dette samarbeidet.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>
                    Designsystem-teamet
                </Undertittel>

                <Normaltekst>
                    Designsystemet vårt har sin hovedstyrke i tverrfaglig samarbeid med de prosjektene og personene
                    som lager produkter og tjenester i NAV.
                </Normaltekst>

                <Normaltekst>
                    Teamet som er ansvarlig for designsystemet består av:
                </Normaltekst>

                <ul>
                    <li>Universell utforming - Karina Ludwig</li>
                    <li>Interaksjonsdesign - Thea Steen Hellebust</li>
                    <li>Kommunikasjon - Mathilde Skjelbostad</li>
                    <li>Utvikling - Erlend Vige, Eirik Lillebo</li>
                    <li>Visuelt design - Sergio Haisch.</li>
                </ul>

                <Normaltekst>
                    Har du noen spørsmål eller kommentarer,&nbsp;
                    <a className="lenke" href="mailto:designsystemet@nav.no">
                        ta gjerne kontakt.
                    </a>
                </Normaltekst>
            </div>
        </div>
    </div>
);

export default AboutPage;
