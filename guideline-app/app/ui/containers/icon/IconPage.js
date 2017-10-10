import React from 'react';

import { // eslint-disable-line import/no-extraneous-dependencies
    EtikettLiten,
    Systemtittel,
    Undertittel,
    Normaltekst
} from 'NavFrontendModules/nav-frontend-typografi'; // eslint-disable-line import/extensions, import/no-unresolved

import IconSquare from './../../components/icon-square/IconSquare';
import SectionTitle from './../../components/section-title/SectionTitle';

import './styles.less';

const IconPage = () => (
    <div className="iconPage">
        <SectionTitle title="Ikoner" />

        <div className="iconPage__textSection">
            <div className="iconSamples" />
            <div className="text">
                <div className="section">
                    <Systemtittel>Prinsipper for ikonbruk</Systemtittel>
                    <Normaltekst>
                        Ikonografi er en viktig del av visuell kommunikasjon på digitale platformer, det bidrar
                        blandt annet ved å visuelisere ideer, simplifisere navigasjon, optimailisere interaksjon
                        og støtte tekst innhold. En felles trekk på ikonene er essensiell for å sørge for en
                        helhetlig visuell språk, NAV bruker Streamline icons v.2.5.
                    </Normaltekst>
                </div>
                <div className="section">
                    <Undertittel>Universell utforming</Undertittel>
                    <Normaltekst>
                        Meningsbærende ikoner skal forholde seg til WCAG 2.0 med en minumun av AA 4.5 kontrastverdi.
                        Ikoner som har en ornamental eller støttende funksjon til teskt kan vises med en 3.0
                        kontrast verdi.
                    </Normaltekst>
                </div>
                <div className="section">
                    <Undertittel>Interaksjon</Undertittel>
                    <Normaltekst>
                        Interaksjon med et ikon skal markeres ved å bruke mer en to visuelle virkemidler.
                        forandring av Form og frage, form og bevegelse, farge og bevegelse osv.
                        I en NAV sammenheng bruker form og farge som hoved markering.
                    </Normaltekst>
                </div>
            </div>
        </div>

        <div className="section iconPage__iconSection">
            <div className="text">
                <EtikettLiten>Edition</EtikettLiten>
                <hr />
            </div>

            <div className="icons">
                <IconSquare name="Advarselsirkel" kind="advarsel-sirkel" />
                <IconSquare name="Advarseltrekant" kind="advarsel-trekant" />
                <IconSquare name="Alarm" kind="alarm" />
                <IconSquare name="Alarm - Ny" kind="alarm-ny" />
                <IconSquare name="Feilsirkel" kind="feil-sirkel-fylt" />
                <IconSquare name="Hjelpsirkel" kind="help-circle" />
                <IconSquare name="Hjelpsirkel Hover" kind="help-circle_hover" />

                <IconSquare name="Infosirkel" kind="info-sirkel" />
                <IconSquare name="Infosirkel Fylt" kind="info-sirkel-fylt" />
                <IconSquare name="Infosirkel Oransje" kind="info-sirkel-orange" />
                <IconSquare name="OK Sirkel" kind="ok-sirkel" />
                <IconSquare name="OK Sirkel Fylt" kind="ok-sirkel-fylt" />
                <IconSquare name="Spinner" kind="spinner" />
                <IconSquare name="Spinner Negativ" kind="spinner-negativ" />

                <IconSquare name="Spinner Stroke" kind="spinner-stroke" />
                <IconSquare name="Spinner S+N" kind="spinner-stroke-negativ" />
                <IconSquare name="Spørsmålsirkel" kind="sporsmal-sirkel" />
                <IconSquare name="Stegindikatorhake" kind="stegindikator__hake" />
            </div>
        </div>
    </div>
);

export default IconPage;
