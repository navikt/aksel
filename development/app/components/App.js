import React, { Component } from 'react';
import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import { Undertittel } from 'NavFrontendModules/nav-frontend-typografi';
import Etikett from 'NavFrontendModules/nav-frontend-etiketter';


import './styles.less';

/*
 * Her er komponenten som benyttes til utvikling av eksisterende og nye moduler til nav-frontend.
 * Appen blir kjørt opp fra npm start-scriptet i package.json på rot, og tar utgangspunkt i
 * webpack-configen som ligger under /development/conf/webpack.config.js.
 *
 * Det er i utgangspunktet ikke ønskelig å sjekke inn endringer som gjøres her til repository, ettersom det er tenkt
 * som et rent utviklingsmiljø og ikke trenger å versjonskontrolleres. Om det er nødvendig å endre på ting her,
 * forklar hvorfor i en PR.
 *
 * Enjoy!
 */


// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Etikett type="info">Dette er en etikett</Etikett>
                    <Etikett type="suksess">Dette er en etikett</Etikett>
                    <Etikett type="advarsel">Dette er en etikett</Etikett>
                    <Etikett type="fokus">Dette er en etikett</Etikett>
                </div>
                <br/>
                <div>
                    <Etikett type="info" mini>Dette er en etikett</Etikett>
                    <Etikett type="suksess" mini>Dette er en etikett</Etikett>
                    <Etikett type="advarsel" mini>Dette er en etikett</Etikett>
                    <Etikett type="fokus" mini>Dette er en etikett</Etikett>
                </div>
            </div>
        );
    }
}
