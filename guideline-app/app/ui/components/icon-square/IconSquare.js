import React, { Component } from 'react';

import Ikon from 'NavFrontendModules/nav-frontend-ikoner-assets'
import { Undertekst, UndertekstBold } from 'NavFrontendModules/nav-frontend-typografi'

import './styles.less'

export class IconSquare extends Component {
    render () {
        return (
            <div className="iconSquareWrapper">
                <div className="iconSquare">
                    <Ikon kind="spinner" />
                </div>

                <div className="textSection">
                    <UndertekstBold>{this.props.name}</UndertekstBold>
                    <Undertekst>Ikonkode</Undertekst>
                </div>
            </div>
        );
    }
}