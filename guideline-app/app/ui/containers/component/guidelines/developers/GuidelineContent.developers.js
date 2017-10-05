import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import { Normaltekst, Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import CodeExample from './code-example/CodeExample';
import PropTypeTable from './../../../../components/prop-type-table/PropTypeTable';

import './styles.less';

class GuidelineContentForDevelopers extends Component {
    renderReactSpecificDoc = (doc) => (
        <div className="react-doc">
            <Systemtittel>
                PropTypes
            </Systemtittel>
            <Normaltekst>
                { doc.description }
            </Normaltekst>
            <PropTypeTable
                docgenInfo={doc}
            />
        </div>
    );

    render() {
        const isImplementedInReact = this.props.componentData.react !== false;
        // eslint-disable-next-line no-underscore-dangle
        const docgenInfo = this.props.componentData.__docgenInfo || this.props.activeType.component.__docgenInfo;

        return (
            <div>
                <CodeExample showReactTab={isImplementedInReact} {... this.props} />

                {
                    docgenInfo &&
                    docgenInfo.props &&
                    isImplementedInReact &&
                    this.renderReactSpecificDoc(docgenInfo)
                }
            </div>
        );
    }
}

GuidelineContentForDevelopers.propTypes = {
    componentData: PT.shape.isRequired,
    activeType: PT.shape({
        component: PT.shape({
            __docgenInfo: PT.shape
        }).isRequired
    }).isRequired
};

// eslint-disable-next-line no-class-assign
GuidelineContentForDevelopers = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(GuidelineContentForDevelopers);

export default GuidelineContentForDevelopers;
