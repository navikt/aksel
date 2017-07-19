import React from 'react';

import { SectionTitle } from './../../components/section-title/SectionTitle';
import {  Normaltekst, Ingress } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

import './styles.less';

import { TextSectionWithImage } from './../../components/text-section-with-image/TextSectionWithImage';

export class HomePage extends React.Component {

    componentWillMount() {
        this.paragraphs = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla, ante id commodo molestie, urna mi posuere nisl, vitae molestie sapien lorem vel diam.',
            'Duis purus sem, convallis eget ultrices eu, gravida sit amet erat. Donec porta tempus enim, in accumsan elit rutrum et. Praesent quam justo, eleifend sed tortor id, mollis consectetur erat.',
            'Donec quis suscipit lorem, sed interdum lacus. Suspendisse sit amet hendrerit quam. Sed et lacus vel turpis posuere suscipit sit amet sit amet lacus.'
        ];
    }

    render() {
        return (
            <div className="homePage">
                <SectionTitle title="Om Designsystemet" />

                <div className="sections">
                    <div className="section">
                        <Ingress>Hva er Designsystemet?</Ingress>
                        <TextSectionWithImage
                            paragraphs={[
                                `Designsystemet er en samling digitale verktøy og UI-komponenter som benyttes av visuelle designere,
                                UX-designere og utviklere i NAV, for å enklere kunne gjenbruke hverandres arbeid på tvers av team,
                                og for at NAV enklest mulig skal kunne opprettholde en visuell identitet på tvers av samtlige
                                tjenester, samt at disse overholder NAVs til enhver tid gjeldende retningslinjer for design og
                                krav til universell utforming.`
                            ]}
                        />
                    </div>

                    <div className="section">
                        <Ingress>Hvorfor bruke Designsystemet?</Ingress>
                        <Normaltekst>
                            Designsystemet er designet for å forenkle arbeidet for alle som jobber med design, utvikling og
                            universell utforming av tjenester i NAV. Fordi alle komponenter allerede er designet og utviklet
                            i henhold til NAVs designretningslinjer og krav til universell utforming, slipper teamet deres å
                            finne ut av alt selv - mange spørsmål har blitt stilt før, og er på en eller annen måte blitt
                            løst i Designsystemet. Derfor oppfordrer vi alle våre team til å ta Designsystemet i bruk.
                        </Normaltekst>
                    </div>

                    <div className="section">
                        <Ingress>Hvordan fungerer Designsystemet?</Ingress>
                        <TextSectionWithImage
                            paragraphs={[
                                `Designsystemet er en samling digitale verktøy og UI-komponenter som benyttes av visuelle designere,
                                UX-designere og utviklere i NAV, for å enklere kunne gjenbruke hverandres arbeid på tvers av team,
                                og for at NAV enklest mulig skal kunne opprettholde en visuell identitet på tvers av samtlige
                                tjenester, samt at disse overholder NAVs til enhver tid gjeldende retningslinjer for design og
                                krav til universell utforming.`
                            ]}
                        />
                    </div>

                    <div className="section">
                        <Ingress>Hvordan kan vi bidra til Designsystemet?</Ingress>
                        <Normaltekst>
                            Designsystemet er designet for å forenkle arbeidet for alle som jobber med design, utvikling og
                            universell utforming av tjenester i NAV. Fordi alle komponenter allerede er designet og utviklet
                            i henhold til NAVs designretningslinjer og krav til universell utforming, slipper teamet deres å
                            finne ut av alt selv - mange spørsmål har blitt stilt før, og er på en eller annen måte blitt
                            løst i Designsystemet. Derfor oppfordrer vi alle våre team til å ta Designsystemet i bruk.
                        </Normaltekst>
                    </div>

                    <div className="section section--withButton">
                        <Knapp>Kom i gang</Knapp>
                    </div>
                </div>
            </div>
        );
    }
}
