import React, { Component } from 'react';
import { Normaltekst, EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';
import { renderComponentWithModifiersAndChildren } from './../../../utils/dom/render.utils';
import { connect } from 'react-redux';
import prettifyXml from 'prettify-xml';
import Highlight from 'react-highlight';
import DOMPurify from 'dompurify';

import './styles.less';

export class CodeExample extends Component {

    componentWillMount() {
        this.state = {
            displayCode: false
        };
    }

    displayCode() {
        this.setState({
            displayCode: true
        });
    }

    hideCode() {
        this.setState({
            displayCode: false
        });
    }

    renderCodeSelector() {
        return (
            <div className="codeSelector">
                <EtikettLiten className="codeSelector__option">React</EtikettLiten>
                <EtikettLiten className="codeSelector__option">HTML</EtikettLiten>
                <EtikettLiten className="codeSelector__option">CSS</EtikettLiten>
            </div>
        );
    }

    renderHighlightedCode(code, lang) {
        return (
            <Highlight className={ lang }>
                { code }
            </Highlight>
        )
    }

    renderCodeExampleFooter() {
        return (
            <Normaltekst className="footer">Trykk i koden for å kopiere til clipboard</Normaltekst>
        );
    }


    render() {
        const shallowComponent = renderComponentWithModifiersAndChildren(
            this.props.activeComponent,
            this.props.activeMultipleChoiceModifiers,
            '',
            true
        );

        let html = prettifyXml(shallowComponent.html());
        // in case of any storage stuff later, make sure to sanitize the HTML
        // due to usage of dangerouslySetInnerHTML in react-highlight dependency
        const purifiedHTML = DOMPurify.sanitize(html);

        return (
            <div className="codeExample">
                { this.renderCodeSelector() }
                { this.renderHighlightedCode(purifiedHTML, 'html') }
                { this.renderCodeExampleFooter() }
            </div>
        );
    }

}

CodeExample = connect((state) => ({
    activeComponent: state.sample.activeComponent,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(CodeExample);