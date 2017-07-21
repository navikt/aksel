import React from 'react';
import { shallow } from 'enzyme';

const wrapComponentWithAttrs = (c, attrs, children) => {
    const wrapper = {
        component: c
    };

    return (<wrapper.component { ... attrs }>{ children }</wrapper.component>);
};

export const renderComponentWithModifiersAndChildren = (component, modifiers, children, shallowRender = false) => {
    if (component) {
        let attributes = {};
        modifiers.forEach((modif) => { attributes[modif.value] = true; });


        if (shallowRender) {
            return shallow(wrapComponentWithAttrs(component, attributes, children));
        }

        return wrapComponentWithAttrs(component, attributes, children);
    }
};