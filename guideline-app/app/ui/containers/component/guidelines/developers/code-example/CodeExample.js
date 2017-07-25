import React, { Component } from 'react';
import { Normaltekst, EtikettLiten } from '../../../../../../../../packages/node_modules/nav-frontend-typografi';
import { getHtmlCodeForComponent, getReactCodeForComponent } from '../../../../../../utils/dom/code-sampling.utils';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';

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
                {
                    this.props.showReactTab &&
                    <EtikettLiten className="codeSelector__option">React</EtikettLiten>
                }
                <EtikettLiten className="codeSelector__option codeSelector__option--active">HTML</EtikettLiten>
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
        const children = this.props.activeType.children;

        const html = getHtmlCodeForComponent(this.props.activeType, this.props.activeMultipleChoiceModifiers, children);
        const jsx = getReactCodeForComponent(this.props.activeType, this.props.activeMultipleChoiceModifiers, children);

        return (
            <div className="codeExample">
                { this.renderCodeSelector() }
                { this.renderHighlightedCode(html, 'html') }
                { this.renderCodeExampleFooter() }
            </div>
        );
    }

}

CodeExample = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(CodeExample);