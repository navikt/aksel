import React, { Component } from 'react';

import {
    Normaltekst,
    Undertittel
} from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import { sanitizeHtml } from './../../../../../utils/dom/code-sampling.utils';

export class GuidelineContentForDesigners extends Component {

    getSanitizedMdFileContent(mdFileContent) {
        return sanitizeHtml(mdFileContent, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
    }

    renderHowToUseSection() {
        return (
            <div className="section">
                <Undertittel>Hvordan bruker jeg { this.props.label }?</Undertittel>
                <Normaltekst>
                    { this.getSanitizedMdFileContent(this.props.usage) }
                </Normaltekst>
            </div>
        );
    }

    renderAccessibilitySection() {
        return (
            <div className="section">
                <Undertittel>{ this.props.label } og universell utforming</Undertittel>
                <Normaltekst>
                    { this.getSanitizedMdFileContent(this.props.accessibility) }
                </Normaltekst>
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
