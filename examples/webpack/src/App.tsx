import React from 'react';

import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Logo } from './assets/navlogo';
import './App.less';


const App = ():JSX.Element => {
    return (
        <main className="container">
            <Logo/>
            <Sidetittel>Webpack bootstrap</Sidetittel>
            <Panel className="panel" border>
                <Normaltekst>Webpack oppsett med støtte for .less og fil-importering, samt hot-reloading</Normaltekst>
                <AlertStripe className="alerts" type="info">
                    For å ta i bruk flere komponenter, gå til {' '}
                    <Lenke href="https://design.nav.no/components">Design.nav.no</Lenke>
                </AlertStripe>
            </Panel>
        </main>
    );
};

export default App;
