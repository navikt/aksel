import React, { Component } from 'react';

import {
    Normaltekst,
    Undertittel
} from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import { MdContent } from './../../../../components/md-content/MdContent';

export class GuidelineContentForDesigners extends Component {

    renderHowToUseSection() {
        return (
            <div className="section">
                <Undertittel>Hvordan bruker jeg { this.props.label }?</Undertittel>
                <MdContent content={ this.props.usage } component={ Normaltekst } />
            </div>
        );
    }

    renderAccessibilitySection() {
        return (
            <div className="section">
                <Undertittel>{ this.props.label } og universell utforming</Undertittel>
                <MdContent content={ this.props.accessibility } component={ Normaltekst } />
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderHowToUseSection() }
                { this.renderAccessibilitySection() }
            </div>
        )
    }

}
