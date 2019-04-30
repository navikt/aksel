import React, { Component } from 'react';
import { 
    AlertStripeSuksess,
    AlertStripeInfo,
    AlertStripeAdvarsel,
    AlertStripeFeil,
    AlertStripeSuksessInline,
    AlertStripeInfoInline,
    AlertStripeAdvarselInline,
    AlertStripeFeilInline
} from 'NavFrontendModules/nav-frontend-alertstriper';
import { Hovedknapp, Fareknapp } from 'NavFrontendModules/nav-frontend-knapper';
import Chevron from 'NavFrontendModules/nav-frontend-chevron';

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
                <AlertStripeInfo>
                     Her er komponenten som benyttes til utvikling av eksisterende og nye moduler til nav-frontend. Appen blir kjørt opp fra npm start-scriptet i package.json på rot, og tar utgangspunkt i webpack-configen som ligger under /development/conf/webpack.config.js.
                </AlertStripeInfo>
                <br/>
                <AlertStripeSuksess>Heisann Hoppsann!</AlertStripeSuksess>
                <br/>
                <AlertStripeAdvarsel>Heisann Hoppsann!</AlertStripeAdvarsel>
                <br/>
                <AlertStripeFeil>Heisann Hoppsann!</AlertStripeFeil>
                

                <br/><br/><br/>


                <AlertStripeInfoInline>
                    Her er komponenten som benyttes til utvikling av eksisterende og nye moduler til nav-frontend. Appen blir kjørt opp fra npm start-scriptet i package.json på rot, og tar utgangspunkt i webpack-configen som ligger under /development/conf/webpack.config.js.
                </AlertStripeInfoInline>
                <br/><br/>
                <AlertStripeSuksessInline>Heisann Hoppsann!</AlertStripeSuksessInline>
                <br/><br/>
                <AlertStripeAdvarselInline>Heisann Hoppsann!</AlertStripeAdvarselInline>
                <br/><br/>
                <AlertStripeFeilInline>Heisann Hoppsann!</AlertStripeFeilInline>
            </div>
        );
    }
}
