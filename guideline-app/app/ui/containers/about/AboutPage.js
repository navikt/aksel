import React from 'react';

import {
    Ingress,
    Normaltekst,
    Sidetittel,
    Undertittel
} from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

const AboutPage = () => (
    <div className="aboutPage">
        <div className="aboutPage__header" />
        <div className="aboutPage__content">
            <Sidetittel>NAV Designsystemet</Sidetittel>
            <div className="section">
                <Ingress>
                    NAV Designsystemet er en samling av verktøy og metodikker som gir muligheten til å kommunisere og
                    løse utfordringer på en konsistent og enhetlig måte, gjennom gjenbruk av design, kode og felles
                    prinsipper for brukeropplevelse.

                    Designsystemet er basert på 4 essensielle områder: Identiteten til NAV, verktøy, metodikk og
                    samhandling
                </Ingress>
            </div>

            <div className="section">
                <Undertittel>Identiteten til NAV</Undertittel>
                <Normaltekst>
                    Verktøykasse med visuelle elementer for å kommunisere med NAV som avsender.
                    Her kan man finne fargepaletten, layout, typografi, ikonene  og illustrasjon.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Verktøy</Undertittel>
                <Normaltekst>
                    NAV has sitt eget frontend-rammeverk (nav-frontend).&nbsp;
                    <a className="lenke" href="/#/components">
                        Her er oversikten på komponentene som finnes der.
                    </a>
                </Normaltekst>

            </div>

            <div className="section">
                <Undertittel>Metodikk</Undertittel>
                <Normaltekst>
                    En viktig del av hvordan vi oppnår enhetlige brukeropplevesler, er at vi tar utgangspunkt i de samme
                    prinsippene for design, klarspråk og tilgjengelighet.
                </Normaltekst>
            </div>

            <div className="section">
                <Undertittel>Samhandling</Undertittel>
                <Normaltekst>
                    Hovedaktørene i designsystemet består av de menneksene som arbeider for å løse utfordringer sammen.
                    Ta gjerne kontakt med designsystem-teamet for mer informasjon om hvordan vi starter samarbeidet.
                </Normaltekst>
            </div>
        </div>
    </div>
);

export default AboutPage;
