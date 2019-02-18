import React, { Component } from 'react';
import { AlertStripeSuksess } from './../../../packages/node_modules/nav-frontend-alertstriper';
import { Hovedknapp, Fareknapp } from './../../../packages/node_modules/nav-frontend-knapper';
import Chevron from './../../../packages/node_modules/nav-frontend-chevron';
import { Container, Column, Row } from './../../../packages/node_modules/nav-frontend-grid';

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
                <Container fluid>
                    <Column xs="6">Hei</Column>
                    <Column xs="6">Hei</Column>
                </Container>
            </div>
        );
    }
}
