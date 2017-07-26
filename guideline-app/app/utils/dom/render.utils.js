import React from 'react';
import { shallow } from 'enzyme';
import jsxToString from 'jsx-to-string';

const wrapComponentWithAttrs = (c, attrs, children) => {
    const wrapper = {
        component: c,
        children: children
    };

    if (!children) {
        return (<wrapper.component { ... attrs } />);
    }

    if (typeof children === 'object') {
        const childAttrs = wrapper.children.attrs;
        const children = (<wrapper.children.component { ... childAttrs }></wrapper.children.component>);

        console.log(jsxToString(children));

        return (
            <wrapper.component { ... attrs } children={[{},{}]}>
                <wrapper.children.component { ... childAttrs }></wrapper.children.component>
            </wrapper.component>
        );
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