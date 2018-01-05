import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import SampleEditor from './SampleEditor';
import { sampleTypeChange, activeRefChange } from '../../../../../redux/actions/sampleActions';
import renderComponentWithModifiersAndChildren from './../../../../../utils/dom/render.utils';
import './styles.less';

class Sample extends Component {
    componentWillMount() {
        const activeType = this.props.activeType;
        const activeComponent = activeType ? activeType.component : null;

        if (!activeComponent || !this.activeComponenMatchescomponentDataDefaults()) {
            this.setDefaultComponent();
        }
    }

    getDefaultType() {
        // eslint-disable-next-line no-underscore-dangle,react/prop-types
        return this.props.componentData.types.filter((el) => el._default)[0];
    }

    setDefaultComponent() {
        const defaultType = this.getDefaultType();
        this.changeActiveType({
            type: defaultType,
            resetModifiers: true
        });
    }

    activeComponenMatchescomponentDataDefaults() {
        const componentData = this.props.componentData;
        const activeComponent = this.props.activeType.component;
        // eslint-disable-next-line no-underscore-dangle
        return componentData.types.some((type) => type._default && type.component === activeComponent);
    }

    changeActiveType(type) {
        // eslint-disable-next-line react/prop-types
        this.props.dispatch(sampleTypeChange(type));
    }

    changeActiveRef(wrapperRef) {
        if (wrapperRef) {
            const ref = wrapperRef.children[0];
            if (this.props.activeRef !== ref) {
                this.props.dispatch(activeRefChange(ref));
            }
        }
    }

    componentDataHasParametersForLiveUpdating() {
        const componentData = this.props.componentData;
        return componentData && (
            (componentData.types.length > 1) ||
            (componentData.types.length === 1 &&
                (componentData.modifiers || componentData.multipleChoiceModifiers)));
    }

    render() {
        const component = renderComponentWithModifiersAndChildren(
            this.props.activeType,
            this.props.activeMultipleChoiceModifiers,
            this.props.activeType.children || ''
        );

        return (
            <div>
                <div className="sampleWrapper">
                    <div className="sample">
                        <EtikettLiten>Eksempel</EtikettLiten>
                        <div className="componentSample" ref={(wrapper) => this.changeActiveRef(wrapper)}>
                            { component }
                        </div>
                    </div>

                    {
                        this.componentDataHasParametersForLiveUpdating() &&
                        <SampleEditor componentData={this.props.componentData} />
                    }
                </div>
            </div>
        );
    }
}

// eslint-disable-next-line no-class-assign
Sample = connect((state) => ({
    activeType: state.sample.activeType,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(Sample);

Sample.propTypes = {
    activeType: PT.shape({ component: PT.element, children: PT.element }),
    activeMultipleChoiceModifiers: PT.arrayOf(PT.string),
    activeRef: PT.node,
    componentData: PT.shape({
        types: PT.arrayOf(PT.shape({})),
        modifiers: PT.arrayOf(PT.shape({})),
        multipleChoiceModifiers: PT.arrayOf(PT.shape({}))
    }).isRequired
};

Sample.defaultProps = {
    activeType: { component: null },
    activeMultipleChoiceModifiers: [],
    activeRef: null,
    componentName: undefined
};

export default Sample;
