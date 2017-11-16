import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst, Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import CodeExample from './code-example/CodeExample';
import PropTypeTable from './../../../../components/prop-type-table/PropTypeTable';
import './styles.less';

class GuidelineContentForDevelopers extends Component {
    renderInstallInstructions = () => (
        <div className="install-doc">
            <Systemtittel>
                Installering
            </Systemtittel>
            <pre>
                <code className="javascript">
                    { this.props.componentData.installInstructions }
                </code>
            </pre>
        </div>
    );

    renderReactSpecificDoc = (doc) => (
        <div className="react-doc">
            <Systemtittel>PropTypes</Systemtittel>
            <Normaltekst>{ doc.description }</Normaltekst>
            <PropTypeTable docgenInfo={doc} />
        </div>
    );

    render() {
        // eslint-disable-next-line no-underscore-dangle
        const docgenInfo = this.props.componentData.__docgenInfo || this.props.activeType.component.__docgenInfo;
        // eslint-disable-next-line react/prop-types, max-len
        const isImplementedInReact = !this.props.componentData.tabOptions || !this.props.componentData.tabOptions.react || this.props.componentData.tabOptions.react.show !== false;

        return (
            <div>
                <CodeExample {... this.props} />

                {
                    docgenInfo &&
                    docgenInfo.props &&
                    isImplementedInReact &&
                    this.renderReactSpecificDoc(docgenInfo)
                }
                { this.renderInstallInstructions() }
            </div>
        );
    }
}

// eslint-disable-next-line no-class-assign
GuidelineContentForDevelopers = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(GuidelineContentForDevelopers);

GuidelineContentForDevelopers.propTypes = {
    componentData: PT.shape({
        __docgenInfo: PT.shape({}),
        react: PT.bool,
        installInstructions: PT.string
    }).isRequired,
    activeType: PT.shape({
        component: PT.shape({
            __docgenInfo: PT.shape
        })
    })
};

GuidelineContentForDevelopers.defaultProps = {
    activeType: {
        component: null
    }
};

export default GuidelineContentForDevelopers;
