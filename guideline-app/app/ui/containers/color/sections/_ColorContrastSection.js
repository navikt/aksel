import React from 'react';
import { Ingress } from 'nav-frontend-typografi';

import { Colors as c } from './../../../../data';
import { ColorContrastSample } from './../../../components/color-contrast-sample/ColorContrastSample';

export const _ColorContrastSection = () => {
    return (
        <div className="colorPage__content">
            <Ingress>
                I henhold til WCAG 2.0 skal vi alltid sørge for at kontrast mellom tekst og bakgrunn har en kontrast
                verdi med minimum AA 4,5. NAV Mørk grå eller hvit er hovedfargene vi bruker for brødtekst.  Det
                finnes noen unntak, i for eksempel lenker eller elementer vist med fokus markering i bakgrunn.
            </Ingress>
            <br/>
            <Ingress>Fargene som skal brukes er vist under:</Ingress>

            <div className="colorPage__content__contrastSamples" style={{ width:'100%' }}>
                <ColorContrastSample color={ c.navMorkGra } contrast={ c.navMorkGra.contrastColors.hvit } />
                <ColorContrastSample color={ c.hvit } contrast={ c.hvit.contrastColors.navMorkGra } />

                <ColorContrastSample color={ c.navBla } contrast={ c.navBla.contrastColors.hvit } />
                <ColorContrastSample color={ c.navLysBla } contrast={ c.navLysBla.contrastColors.navMorkGra } />

                <ColorContrastSample color={ c.navDypBla } contrast={ c.navDypBla.contrastColors.hvit } />
                <ColorContrastSample color={ c.navLysBla20 } contrast={ c.navLysBla20.contrastColors.navMorkGra } />

                <ColorContrastSample color={ c.navLilla } contrast={ c.navLilla.contrastColors.hvit } />
                <ColorContrastSample color={ c.navLilla60 } contrast={ c.navLilla60.contrastColors.navMorkGra } />

                <ColorContrastSample color={ c.navGra80 } contrast={ c.navGra80.contrastColors.hvit }  />
                <ColorContrastSample color={ c.orangeFocus } contrast={ c.orangeFocus.contrastColors.navMorkGra }  />

                <ColorContrastSample color={ c.navGra60 } contrast={ c.navGra60.contrastColors.hvit }  />
                <ColorContrastSample color={ c.navMorkGra } contrast={ c.navMorkGra.contrastColors.navGra20 }  />

                <ColorContrastSample color={ c.redError } contrast={ c.redError.contrastColors.hvit }  />
                <ColorContrastSample color={ c.navMorkGra } contrast={ c.navMorkGra.contrastColors.navGra40 }  />

                <ColorContrastSample color={ c.navMorkGra } contrast={ c.navMorkGra.contrastColors.navLysGra }  />
                <ColorContrastSample color={ c.navMorkGra } contrast={ c.navMorkGra.contrastColors.orangeFocus }  />

                <ColorContrastSample color={ c.navBla } contrast={ c.navBla.contrastColors.navLysGra }  />
                <ColorContrastSample color={ c.navBla40 } contrast={ c.navBla40.contrastColors.orangeFocus }  />

                <ColorContrastSample color={ c.navDypBla } contrast={ c.navDypBla.contrastColors.navLysGra }  />
                <ColorContrastSample color={ c.navDypBla } contrast={ c.navDypBla.contrastColors.orangeFocus }  />

                <ColorContrastSample color={ c.navLilla } contrast={ c.navLilla.contrastColors.navLysGra } />
                <ColorContrastSample color={ c.navLilla } contrast={ c.navLilla.contrastColors.orangeFocus } />

                <ColorContrastSample color={ c.navGra80 } contrast={ c.navGra80.contrastColors.navLysGra } />
                <ColorContrastSample color={ c.navLilla } contrast={ c.navLilla.contrastColors.orangeFocus } />

                <ColorContrastSample color={ c.navGra60 } contrast={ c.navGra60.contrastColors.navLysGra } />
                <ColorContrastSample color={ c.hvit } contrast={ c.hvit.contrastColors.redError } />

                <ColorContrastSample color={ c.redError } contrast={ c.redError.contrastColors.navLysGra } />
                <ColorContrastSample color={ c.redError } contrast={ c.redError.contrastColors.pinkErrorBg } />
            </div>
        </div>
    )
};