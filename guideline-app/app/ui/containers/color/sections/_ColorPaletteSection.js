import React from 'react';
import { Ingress } from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { Colors as c } from './../../../../data';
import { ColorPalette } from './../../color-palette/ColorPalette';

export const _ColorPaletteSection = () => {
    return (
        <div className="colorPage__content">
            <Ingress>
                Fargevalg i NAV har sterk funksjonell grunn og bruk av fargene skal
                være gjennomtenkt i forhold til visuell kommunikasjon og NAV sine designprinsipper.
            </Ingress>

            <div className="colorSection">
                <ColorPalette colors={ [c.navRod, c.navMorkGra, c.navLysGra] } />
            </div>

            <div className="colorSection">
                <b>Interaksjonsfarger</b>

                <ColorPalette colors={ [c.navBla, c.navDypBla, c.navLilla] } />
            </div>

            <div className="colorSection">
                <b>Feedbackfarger</b>

                <ColorPalette colors={ [c.redError, c.pinkErrorBg, c.navGronn, c.navOransje, c.orangeFocus] } />
            </div>

            <div className="colorSection">
                <b>Tilleggsfarger</b>

                <ColorPalette colors={ [c.navLimeGronn, c.navLysBla] } />
            </div>
        </div>
    )
};