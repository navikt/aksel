import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import { Radio, Checkbox } from './../../../../../../../packages/node_modules/nav-frontend-skjema';

import {
    sampleTypeChange,
    sampleMultipleChoiceModifierChange,
    sampleModifierChange
} from '../../../../../redux/actions/sampleActions';

class SampleEditor extends Component {

    hasSingleChoiceModifiers() {
        return this.props.componentData.modifiers;
    }

    hasMultipleChoiceModifiers() {
        return this.props.componentData.multipleChoiceModifiers;
    }

    hasModifiers() {
        return this.hasSingleChoiceModifiers() || this.hasMultipleChoiceModifiers();
    }

    dispatchActiveTypeChanged(type) {
        // eslint-disable-next-line react/prop-types
        this.props.dispatch(sampleTypeChange({ type }));
    }

    dispatchModifierChanged(modifier) {
        if (this.hasMultipleChoiceModifiers()) {
            return this.props.dispatch(sampleMultipleChoiceModifierChange(modifier));
        }
        return this.props.dispatch(sampleModifierChange(modifier));
    }

    hasChangedModifier(sample) {
        const activeType = this.props.activeType;
        return sample.modifiers && sample.modifiers.some((modifier) => modifier.component === activeType.component);
    }

    typeIsChecked(sample) {
        const activeType = this.props.activeType;
        if (!activeType.component && sample.component) {
            // eslint-disable-next-line no-underscore-dangle
            return sample._default;
        }
        return activeType === sample || this.hasChangedModifier(sample);
    }

    modifierIsChecked(modifier) {
        if (this.hasMultipleChoiceModifiers()) {
            return this.props.activeMultipleChoiceModifiers.indexOf(modifier) > -1;
        }
        return false;
    }

    renderTypes() {
        if (this.props.componentData.types.length > 1) {
            return (
                <div className="types">
                    {
                        this.props.componentData.types.map((sample, index) =>
                            // eslint-disable-next-line react/no-array-index-key
                            (<SampleType sample={sample} context={this} key={index} />)
                        )
                    }
                </div>
            );
        }
        return null;
    }

    renderModifiers() {
        const isMultipleChoice = this.hasMultipleChoiceModifiers();
        const component = isMultipleChoice ? Checkbox : Radio;
        const modifierSource = isMultipleChoice ?
            this.props.componentData.multipleChoiceModifiers : this.props.componentData.modifiers;

        return (
            <div className="modifiers">
                {
                    modifierSource.map((modifier, index) =>
                        // eslint-disable-next-line react/no-array-index-key
                        (<SampleModifier component={component} modifier={modifier} context={this} key={index} />)
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div className="sampleEditor">
                <EtikettLiten>Tilgjengelige parametere</EtikettLiten>

                <div className="sampleEditor__form">
                    { this.renderTypes() }
                    { this.hasModifiers() && this.renderModifiers() }
                </div>
            </div>
        );
    }
}
SampleEditor.propTypes = {
    activeType: PT.shape({
        component: PT.func.isRequired,
        children: PT.oneOfType([PT.array, PT.node])
    }).isRequired,
    activeMultipleChoiceModifiers: PT.arrayOf(PT.shape({})),
    componentData: PT.shape({
        types: PT.arrayOf(PT.shape({})),
        modifiers: PT.arrayOf(PT.oneOfType([PT.shape({}), PT.string])),
        multipleChoiceModifiers: PT.arrayOf(PT.oneOfType([PT.shape({}), PT.string]))
    }).isRequired
};

SampleEditor.defaultProps = {
    activeMultipleChoiceModifiers: [],
    activeRef: null
};


const SampleModifier = (props) => {
    const modifier = props.modifier;
    const context = props.context;

    return (
        <props.component
            label={modifier.label}
            name={modifier.label}
            value={modifier.value}
            checked={context.modifierIsChecked(modifier) || false}
            onChange={() => context.dispatchModifierChanged(modifier)}
        />
    );
};
SampleModifier.propTypes = {
    modifier: PT.shape({
        label: PT.string.isRequired,
        value: PT.oneOfType([PT.string, PT.shape({})])
    }).isRequired,
    context: PT.shape({}).isRequired
};


const SampleType = (props) => {
    const sample = props.sample;
    const context = props.context;

    return (
        <Radio
            label={sample.label}
            name="sampleTypeRadio"
            value={sample.component.name}
            checked={context.typeIsChecked(sample) || false}
            onChange={() => context.dispatchActiveTypeChanged(sample)}
        />
    );
};
SampleType.propTypes = {
    sample: PT.shape({
        label: PT.string.isRequired,
        component: PT.func.isRequired
    }).isRequired,
    context: PT.shape({}).isRequired
};

// eslint-disable-next-line no-class-assign
SampleEditor = connect((state) => ({
    activeType: state.sample.activeType,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(SampleEditor);

export default SampleEditor;
