import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Normaltekst, Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import { CodeExample } from './code-example/CodeExample';
import { PropTypeTable } from './../../../../components/prop-type-table/PropTypeTable';

import './styles.less';

export class GuidelineContentForDevelopers extends Component {

    renderReactSpecificDoc(doc) {
        return (
            <div className="react-doc">
                <Systemtittel>
                    PropTypes
                </Systemtittel>
                <Normaltekst>
                    { doc.description }
                </Normaltekst>
                <PropTypeTable
                    docgenInfo={ doc }
                />
            </div>
        );
    }

    render() {
        const isImplementedInReact = this.props.componentData.react !== false;
        const docgenInfo =
            this.props.componentData.__docgenInfo ||
            this.props.activeType.component.__docgenInfo;

        return (
            <div>
                <CodeExample
                    showReactTab={ isImplementedInReact }
                    { ... this.props }
                />

                {
                    docgenInfo &&
                    isImplementedInReact &&
                    this.renderReactSpecificDoc(docgenInfo)
                }
            </div>
        )
    }

}

GuidelineContentForDevelopers = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(GuidelineContentForDevelopers);