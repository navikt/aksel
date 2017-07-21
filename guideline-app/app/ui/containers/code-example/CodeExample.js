import React, { Component } from 'react';
import { EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';
import { shallow } from 'enzyme';
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

    renderHighlightedCode(code, lang) {
        return (
            <Highlight className={ lang }>
                { code }
            </Highlight>
        )
    }

    renderDisplayCodeTrigger() {
        return (
            <EtikettLiten className="codeExample__centeredText" onClick={ () => this.displayCode() }>
                Se kode
            </EtikettLiten>
        );
    }

    renderHideCodeTrigger() {
        return (
            <div>
                <EtikettLiten>REACT | HTML | CSS</EtikettLiten>
                <EtikettLiten className="codeExample__centeredText" onClick={ () => this.hideCode() }>
                    Skjul kode
                </EtikettLiten>
                <EtikettLiten>Copy to clipboard</EtikettLiten>
            </div>
        );
    }

    renderCodeTypeSelector() {
        return (
            <div>
                <div className="codeTypeSelector">
                    <EtikettLiten>React</EtikettLiten>
                    <EtikettLiten>HTML</EtikettLiten>
                    <EtikettLiten>CSS</EtikettLiten>
                </div>

                <EtikettLiten>Copy to clipboard</EtikettLiten>
            </div>
        )
    }

    render() {
        const shallowComponent = shallow(<this.props.activeComponent>SomeChild</this.props.activeComponent>);
        let html = prettifyXml(shallowComponent.html());

        // in case of any storage stuff later, make sure to sanitize the HTML
        // due to usage of dangerouslySetInnerHTML in react-highlight dependency
        const purifiedHTML = DOMPurify.sanitize(html);

        return (
            <div className="codeExample">

                { !this.state.displayCode && this.renderDisplayCodeTrigger() }
                { this.state.displayCode && this.renderCodeTypeSelector() }
                { this.state.displayCode && this.renderHighlightedCode(purifiedHTML, 'html') }
                { this.state.displayCode && this.renderHideCodeTrigger() }

            </div>
        );
    }

}

CodeExample = connect((state) => ({
    activeComponent: state.sample.activeComponent,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(CodeExample);