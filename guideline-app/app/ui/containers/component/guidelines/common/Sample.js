import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import { SampleEditor } from './SampleEditor';
import { sampleTypeChange } from '../../../../../redux/actions/sampleActions';
import { renderComponentWithModifiersAndChildren } from './../../../../../utils/dom/render.utils';

import './styles.less';

export class Sample extends Component {
    componentWillMount() {
        const activeType = this.props.activeType;
        const activeComponent = activeType ? activeType.component: null;

        if (!activeComponent || !this.activeComponenMatchesSampleDataDefaults()) {
            this.setDefaultComponent();
        }
    }

    componentDidUpdate(previousProps) {
        const sampleData = this.props.sampleData;
        const activeType = this.props.activeType;

        if (sampleData.modifiers && sampleData.modifiers.length > 0 && this.props.activeModifier) {
            const typeMatch = this.getTypeMatchingCurrentActiveModifier();
            if (typeMatch && typeMatch.component !== activeType.component) {
                this.changeActiveType({
                    type: typeMatch,
                    resetModifiers: previousProps.componentName !== this.props.componentName
                });
            }
        }
    }

    activeComponenMatchesSampleDataDefaults() {
        const sampleData = this.props.sampleData;
        const activeComponent = this.props.activeType.component;
        return sampleData.types.some((type) => type._default && type.component === activeComponent);
    }

    getTypeMatchingCurrentActiveModifier() {
        const types = this.props.sampleData.types;
        const activeModifier = this.props.activeModifier;
        const activeComponent = this.props.activeType.component;
        let match = null;

        types.forEach((type) => {
            if (type.modifiers && this.componentExistsInSampleDataSubTree(activeComponent, type)) {
                type.modifiers.forEach((modifier) => {
                     if (modifier.value === activeModifier.value) {
                         match = modifier;
                     }
                });
            }
        });

        return match;
    }

    componentExistsInSampleDataSubTree(component, subtree) {
        return subtree.component === component || subtree.modifiers.some((modifier) => modifier.component === component);
    }

    getDefaultType() {
        return this.props.sampleData.types.filter((el) => el._default)[0];
    }

    setDefaultComponent() {
        const defaultType = this.getDefaultType();
        this.changeActiveType({
            type: defaultType,
            resetModifiers: true
        });
    }

    changeActiveType(type) {
        this.props.dispatch(sampleTypeChange(type));
    }

    render () {
        return (
            <div>
                <div className="sampleWrapper">
                    <div className="sample">
                        <EtikettLiten>Eksempel</EtikettLiten>
                        <div className="componentSample">
                            {
                                renderComponentWithModifiersAndChildren(
                                    this.props.activeType,
                                    this.props.activeMultipleChoiceModifiers,
                                    this.props.activeType.children || ''
                                )
                            }
                        </div>
                    </div>

                    {
                        this.props.sampleData &&
                        <SampleEditor sampleData={ this.props.sampleData } />
                    }
                </div>
            </div>
        )
    }
}

Sample = connect((state) => ({
    activeType: state.sample.activeType,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(Sample);