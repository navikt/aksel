import React, { Component } from 'react';
import { AlertStripeSuksess } from './../../../packages/node_modules/nav-frontend-alertstriper';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
    render() {
        return (
            <div>
                <AlertStripeSuksess>Heisann Hoppsann!</AlertStripeSuksess>
            </div>
        );
    }
}