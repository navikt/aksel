import React, { Component } from 'react';
import { EtikettLiten } from '../../../../../../../../packages/node_modules/nav-frontend-typografi';
import {
    getHtmlCodeForComponent,
    getReactCodeForComponent,
    getCSSCodeForComponent
} from '../../../../../../utils/dom/code-sampling.utils';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';

import './styles.less';

export class CodeExample extends Component {
    static languages = [
        { id: 'react', label: 'React' },
        { id: 'html', label: 'HTML' },
        { id: 'css', label: 'CSS' }
    ];

    componentWillMount() {
        this.state = {
            activeTab: CodeExample.languages[1]
        };
    }

    renderCodeSelector() {
        return (
            <div className="codeSelector">

                { this.props.showReactTab && this.renderCodeOption(CodeExample.languages[0]) }
                { this.renderCodeOption(CodeExample.languages[1]) }
                { this.renderCodeOption(CodeExample.languages[2]) }
            </div>
        );
    }

    renderCodeOption(codeOption) {
        let clazzList = 'codeSelector__option';
        if (this.state.activeTab.id === codeOption.id) {
            clazzList += ' codeSelector__option--active';
        }

        return (
            <EtikettLiten
                className={ clazzList }
                onClick={ () => this.changeActiveCodeOption(codeOption) }>
                { codeOption.label }
            </EtikettLiten>
        )
    }

    changeActiveCodeOption(codeOption) {
        this.setState({
            activeTab: codeOption
        })
    }

    renderHighlightedCode(code, lang) {
        return (
            <Highlight className='html'>
                { code }
            </Highlight>
        )
    }

    render() {
        const activeTab = this.state.activeTab;
        const children = this.props.activeType.children;
        const activeRef = this.props.activeRef;

        let codeToDisplay = '';

        const html = getHtmlCodeForComponent(this.props.activeType, this.props.activeMultipleChoiceModifiers, children);
        const jsx = getReactCodeForComponent(this.props.activeType, this.props.activeMultipleChoiceModifiers, children);
        const css = getCSSCodeForComponent(activeRef);

        switch (activeTab.id) {
            case 'react':
                codeToDisplay = jsx;
                break;
            case 'html':
                codeToDisplay = html;
                break;
            case 'css':
                codeToDisplay = css;
                break;
            default:
                codeToDisplay = html;
        }

        return (
            <div className="codeExample">
                { this.renderCodeSelector() }
                { this.renderHighlightedCode(codeToDisplay, activeTab.id) }
            </div>
        );
    }

}

CodeExample = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(CodeExample);