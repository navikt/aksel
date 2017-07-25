import React from 'react';
import { shallow } from 'enzyme';

const wrapComponentWithAttrs = (c, attrs, children) => {
    const wrapper = {
        component: c
    };

    if (!children) {
        return (<wrapper.component { ... attrs } />);
    }

    return (<wrapper.component { ... attrs }>{ children }</wrapper.component>);
};

const mergeAttrs = (attrs1, attrs2) => (Object.assign({}, attrs1, attrs2));

export const renderComponentWithModifiersAndChildren = (type, modifiers, children, shallowRender = false) => {
    const component = type.component;

    if (component) {
        const typeAttrs = type.attrs;

        let modifierAttrs = {};
        modifiers.forEach((modif) => { modifierAttrs[modif.value] = true; });


        if (shallowRender) {
            return shallow(wrapComponentWithAttrs(component, mergeAttrs(typeAttrs, modifierAttrs), children));
        }

        return wrapComponentWithAttrs(component, mergeAttrs(typeAttrs, modifierAttrs), children);
    }
};