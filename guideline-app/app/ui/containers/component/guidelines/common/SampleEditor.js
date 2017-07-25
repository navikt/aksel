import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import { Radio, Checkbox } from './../../../../../../../packages/node_modules/nav-frontend-skjema';

import {
    sampleTypeChange,
    sampleMultipleChoiceModifierChange,
    sampleModifierChange
} from '../../../../../redux/actions/sampleActions';

export class SampleEditor extends Component {

    hasSingleChoiceModifiers() {
        return this.props.sampleData.modifiers;
    }

    hasMultipleChoiceModifiers() {
        return this.props.sampleData.multipleChoiceModifiers;
    }

    hasModifiers() {
        return this.hasSingleChoiceModifiers() || this.hasMultipleChoiceModifiers();
    }

    dispatchActiveTypeChanged(type) {
        this.props.dispatch(sampleTypeChange({
            type: type
        }));
    }

    dispatchModifierChanged(modifier) {
        if (this.hasMultipleChoiceModifiers()) {
            return this.props.dispatch(sampleMultipleChoiceModifierChange(modifier))
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
            return sample._default;
        }
        return activeType === sample || this.hasChangedModifier(sample);
    }

    modifierIsChecked(modifier) {
        if (this.hasMultipleChoiceModifiers()) {
            return this.props.activeMultipleChoiceModifiers.indexOf(modifier) > -1;
        }
        else if (!this.props.activeModifier && modifier.value) {
            return modifier._default;
        }
        return this.props.activeModifier.value === modifier.value;
    }

    renderTypes() {
        return (
            <div className="types">
                {
                    this.props.sampleData.types.map((sample, index) =>
                        (<SampleType sample={ sample } context={ this } key={ index } />)
                    )
                }
            </div>
        )
    }

    renderModifiers() {
        const isMultipleChoice = this.hasMultipleChoiceModifiers();
        const Component = isMultipleChoice ? Checkbox : Radio;
        const modifierSource = isMultipleChoice ? this.props.sampleData.multipleChoiceModifiers : this.props.sampleData.modifiers;

        return (
            <div className="modifiers">
                {
                    modifierSource.map((modifier, index) =>
                        (<SampleModifier component={ Component } modifier={ modifier } context={ this } key={ index } />)
                    )
                }
            </div>
        )
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
        )
    }
}

const SampleModifier = (props) => {
    const modifier = props.modifier;
    const context = props.context;

    return (
        <props.component
            label={ modifier.label }
            name={ modifier.label }
            value={ modifier.value }
            checked={ context.modifierIsChecked(modifier) || false }
            onChange={ () => context.dispatchModifierChanged(modifier) }
        />
    )
};

const SampleType = (props) => {
    const sample = props.sample;
    const context = props.context;

    return (
        <Radio
            label={ sample.label }
            name="sampleTypeRadio"
            value={ sample.component.name }
            checked={ context.typeIsChecked(sample) || false }
            onChange={ () => context.dispatchActiveTypeChanged(sample) }
        />
    )
};

SampleEditor = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(SampleEditor);