import React from 'react';

import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Panel from 'NavFrontendModules/nav-frontend-paneler';
import Tabs from 'NavFrontendModules/nav-frontend-tabs';
import { Innholdstittel, Systemtittel, Undertittel, Ingress, Element, Normaltekst } from 'NavFrontendModules/nav-frontend-typografi';

import ColorSample from '../../../components/color-sample/ColorSample';
import ColorPalette from '../../../components/color-palette/ColorPalette';

import './styles.less';

const ColorPage = () => (
    <React.Fragment>
        <Innholdstittel>Farger</Innholdstittel>

        <div className="tabsContainer tabsContainer--fullWidth">
            <Tabs>
                <Tabs.Tab>Fargepalett</Tabs.Tab>
                <Tabs.Tab>Tilgjengelighet</Tabs.Tab>
                <Tabs.Tab>Teknisk</Tabs.Tab>
                <Tabs.Tab>Diskusjon</Tabs.Tab>
            </Tabs>
        </div>

        <section className="section">
            <Systemtittel>Hovedfarger</Systemtittel>
            <Normaltekst>
                NAV har en fargepalett der rødt og grått er de førende fargene.
            </Normaltekst>

            <div className="color-group">
                <ColorSample name="@navRod" color="#c30000" />
            </div>

            <div className="color-group">
                <ColorSample name="@navMorkGra" color="#3E3832" />
                <ColorSample name="@navGra80" color="#59514B" />
                <ColorSample name="@navGra60" color="#78706A" />
                <ColorSample name="@navGra40" color="#B7B1A9" />
                <ColorSample name="@navGra20" color="#C6C2BF" />
                <ColorSample name="@navLysGra" color="#E9E7E7" />
            </div>
        </section>

        <section className="section">
            <Systemtittel>Systemfarger</Systemtittel>
            <Alertstripe type="info">
                Dette er farger som hovedsakelig er reservert for spesifikke funksjoner i systemet.
                Man bør unngå å bruke akkurat disse fargene til dekor eller pynt.
            </Alertstripe>
            <div className="color-group">
                <Ingress>Interaksjonsfarge</Ingress>
                <ColorSample name="@navBla" color="#0067c5" />
                <div className="color-description">
                    <p>
                        Denne fargen er reservert av systemet for å indikere interaktivitet. Den brukes
                        som tekstfarge på lenker, border- og bakgrunnsfarge på knapper og andre klikkbare
                        elementer, og som fyll på klikkbare ikoner.
                    </p>
                </div>
            </div>
            <div className="color-group">
                <Ingress>Fokusfarge</Ingress>
                <ColorSample name="@navOransjeFokus" color="#ffbd66" />
                <div className="color-description">
                    <p>
                        Denne fargen er reservert av systemet for å indikere fokus. Interaktive elementer
                        som får fokus blir vanligvis markert med en 2px tykk outline med denne fargen.
                    </p>
                </div>
            </div>
            <div className="color-group">
                <Ingress>Feedback: suksess</Ingress>
                <ColorSample name="@navGronn" color="#06893A" />
                <ColorSample name="@navGronnLighten60" color="#9BD0B0" />
                <div className="color-description">
                    <p>
                        Disse fargene er reservert av systemet for å indikere positiv feedback, f.eks. som
                        et resultat av en vellykket hendelse.
                    </p>
                </div>
            </div>
            <div className="color-group">
                <Ingress>Feedback: feilmelding</Ingress>
                <ColorSample name="@redError" color="#BA3A26" />
                <ColorSample name="@pinkErrorBg" color="#F3E3E3" />
                <div className="color-description">
                    <p>
                        Disse fargene er reservert av systemet for å indikere negativ feedback, f.eks. som
                        et resultat av en mislykket hendelse.
                    </p>
                </div>
            </div>
            <div className="color-group">
                <Ingress>Feedback: advarsel</Ingress>
                <ColorSample name="@navOransje" color="#FF9100" />
                <ColorSample name="@navOransjeLighten60" color="#FFD399" />
                <div className="color-description">
                    <p>
                        Denne fargen er reservert av systemet for å gi forberedende feedback, f.eks. som
                        en advarsel om at noe uønsket eller uforutsett kan forekomme.
                    </p>
                </div>
            </div>
        </section>

        <section className="section full">
            <Systemtittel>Hele paletten</Systemtittel>
            <ColorPalette />
        </section>
        
        
    </React.Fragment>
);

export default ColorPage;
