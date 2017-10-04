import React from 'react';

import {
    Normaltekst,
    Innholdstittel
} from './../../../../../packages/node_modules/nav-frontend-typografi';

import teamworkImg from './../../../assets/images/about/teamwork.png';
import processImg from './../../../assets/images/about/process.png';

import './styles.less';

const AboutPage = () => (
    <div className="aboutPage">
        <div className="section">
            <Innholdstittel>
                Hva er designsystemet?
            </Innholdstittel>

            <Normaltekst>
                Designsystemet er et økosystem som tilrettelegger for effektiv samhandling,
                og beskriver hvordan man tar i bruk
                verktøy og metodikk for å utvikle tjenester og produkter i NAV.
                Systemet beskriver også detaljer
                om visuell utforming, interaksjon og prinsipper for brukeropplevelse.
            </Normaltekst>

            <img src={teamworkImg} alt="Samarbeidet" />
        </div>

        <div className="section">
            <Innholdstittel>
                Prosess og samarbeid
            </Innholdstittel>

            <img src={processImg} alt="Prosessen" />

            <Normaltekst>
                Hovedtyngden av samhandlingen foregår mellom interaksjonsdesignere, grafiske designere og front
                end-utviklere i leveranseteam og oss. Denne samhandlingen har vi erfaring med, og det er
                etablert en prosess, noen møtepunkter og noen samarbeidsverktøy (Zeplin, Craft m.m.) vi vil
                fortsette å iterere over.
            </Normaltekst>
            <br />
            <Normaltekst>
                Designere og utviklere i leveranseteam har et ansvar for å være samstemt med fag og forretning i
                designvalg. Vi bistår med designvalg i tidlig fase og sørger for god dokumentasjon av valg som
                allerede er tatt.
                Vi ønsker å bidra til at NAV blir smidigere, og legger derfor opp til en samhandlingsmetode som
                er tuftet på det smidige manifest og en open source-metodikk som har vist seg levedyktig andre
                steder.
            </Normaltekst>
        </div>
    </div>
);

export default AboutPage;
