import React from 'react';

import Alertstripe from './../../../../../../../packages/node_modules/nav-frontend-alertstriper';
import { LenkepanelBase } from './../../../../../../../packages/node_modules/nav-frontend-lenkepanel';

class Discussion extends React.Component {
    render() {
        console.log('Discussion', this.props);
        return (
            <section className="section">
                <Alertstripe type="info">
                    Vi jobber med å lage et forum hvor man kan diskutere og komme med innspill 
                    til designsystemet. Før dette er på plass kan 
                    dere gjerne <a href="https://github.com/navikt/nav-frontend-moduler/issues">bruke Github</a> til
                    å opprette saker og diskutere der.
                </Alertstripe>
            </section>
        );
    }
}

export default Discussion;