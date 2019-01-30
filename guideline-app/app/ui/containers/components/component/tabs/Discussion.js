import React from 'react';

import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';

class Discussion extends React.Component {
    render() {
        console.log('Discussion', this.props);
        return (
            <section className="section">
                <Alertstripe type="info">
                    Vi jobber med å lage et forum hvor man kan diskutere og komme med innspill 
                    til designsystemet. Før dette er på plass kan 
                    dere gjerne <Lenke href="https://github.com/navikt/nav-frontend-moduler/issues">bruke Github</Lenke> til
                    å opprette saker og diskutere der.
                </Alertstripe>
            </section>
        );
    }
}

export default Discussion;