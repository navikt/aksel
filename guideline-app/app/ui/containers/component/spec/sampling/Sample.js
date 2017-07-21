import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EtikettLiten } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import { SampleEditor } from './SampleEditor';
import { CodeExample } from '../../../code-example/CodeExample';
import { sampleTypeChange } from '../../../../../redux/actions/sampleActions';

import './styles.less';

export class Sample extends Component {
    componentWillMount() {
        if (!this.props.activeComponent || !this.activeComponenMatchesSampleDataDefaults()) {
            this.setDefaultComponent();
        }
    }

    componentDidUpdate(previousProps) {
        const sampleData = this.props.sampleData;

        if (sampleData.modifiers && sampleData.modifiers.length > 0 && this.props.activeModifier) {
            const componentMatch = this.getComponentMatchingCurrentActiveModifier();
            if (componentMatch && componentMatch !== this.props.activeComponent) {
                this.changeActiveComponent({
                    component: componentMatch,
                    resetModifiers: previousProps.componentName !== this.props.componentName
                });
            }
        }
    }

    activeComponenMatchesSampleDataDefaults() {
        const sampleData = this.props.sampleData;
        const activeComponent = this.props.activeComponent;
        return sampleData.types.some((type) => type._default && type.component === activeComponent);
    }

    getComponentMatchingCurrentActiveModifier() {
        const types = this.props.sampleData.types;
        const activeModifier = this.props.activeModifier;
        const activeComponent = this.props.activeComponent;
        let match = null;

        types.forEach((type) => {
            if (type.modifiers && this.componentExistsInSampleDataSubTree(activeComponent, type)) {
                type.modifiers.forEach((modifier) => {
                     if (modifier.value === activeModifier.value) {
                         match = modifier.component;
                     }
                });
            }
        });

        return match;
    }

    componentExistsInSampleDataSubTree(component, subtree) {
        return subtree.component === component || subtree.modifiers.some((modifier) => modifier.component === component);
    }

    getDefaultComponent() {
        return this.props.sampleData.types.filter((el) => el._default)[0].component;
    }

    setDefaultComponent() {
        const defaultComponent = this.getDefaultComponent();
        this.changeActiveComponent({
            component: defaultComponent,
            resetModifiers: true
        });
    }

    changeActiveComponent(component) {
        this.props.dispatch(sampleTypeChange(component));
    }

    renderComponent() {
        if (this.props.activeComponent) {
            let attributes = {};
            this.props.activeMultipleChoiceModifiers.forEach((modif) => { attributes[modif.value] = true; });

            return (
                <this.props.activeComponent { ... attributes }>
                    { this.props.sampleData.children || '' }
                </this.props.activeComponent>
            )

            // TODO: Implement automatic handling of components with no children (such as radio, checkbox and input)
        }
    }

    render () {
        return (
            <div>
                <div className="sampleWrapper">
                    <div className="sample">
                        <EtikettLiten>Eksempel</EtikettLiten>
                        <div className="componentSample">
                            { this.renderComponent() }
                        </div>
                    </div>

                    {
                        this.props.sampleData &&
                        <SampleEditor sampleData={ this.props.sampleData } />
                    }
                </div>

                <CodeExample />
            </div>
        )
    }
}

Sample = connect((state) => ({
    activeComponent: state.sample.activeComponent,
    activeModifier: state.sample.activeModifier,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers
}))(Sample);