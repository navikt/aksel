import React from 'react';
import { Ingress, Systemtittel, Undertittel } from './../../../../../../packages/node_modules/nav-frontend-typografi';
import { Colors as c } from './../../../../data';
import ColorPalette from './../../color-palette/ColorPalette';

export default function PaletteSection() {
    return (
        <div className="colorPage__content">
            <Ingress>
                Fargevalg i NAV har sterk funksjonell grunn og bruk av fargene skal
                være gjennomtenkt i forhold til visuell kommunikasjon og NAV sine designprinsipper.
            </Ingress>

            <div className="section">
                <Systemtittel>Fargepalett</Systemtittel>
                <hr />

                <div className="colorSection">
                    <Undertittel tag="h3">Hovedfarger</Undertittel>
                    <ColorPalette colors={[c.navRod, c.navMorkGra, c.navLysGra]} />
                </div>

                <div className="colorSection">
                    <Undertittel tag="h3">Interaksjonsfarger</Undertittel>
                    <ColorPalette colors={[c.navBla, c.navDypBla, c.navLilla]} />
                </div>

                <div className="colorSection">
                    <Undertittel tag="h3">Feedbackfarger</Undertittel>
                    <ColorPalette colors={[c.redError, c.pinkErrorBg, c.navGronn, c.navOransje, c.orangeFocus]} />
                </div>

                <div className="colorSection">
                    <Undertittel tag="h3">Tilleggsfarger</Undertittel>
                    <ColorPalette colors={[c.navLimeGronn, c.navLysBla]} />
                </div>
            </div>
        </div>
    );
}
