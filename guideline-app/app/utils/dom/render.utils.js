import React from 'react';
import { shallow } from 'enzyme';

const renderComponentWithNoChildren = (componentData) => (
    <componentData.component {... componentData.attrs} />
);

const renderComponentWithSingleChild = (componentData) => (
    <componentData.component {... componentData.attrs}>
        { componentData.children }
    </componentData.component>
);

const renderComponentWithSingleComponentChild = (componentData) => (
    <componentData.component {... componentData.attrs}>
        <componentData.child.component {... componentData.child.attrs}>
            { componentData.child.children }
        </componentData.child.component>
    </componentData.component>
);

const renderComponent = (c, attrs, children) => {
    const componentData = {
        component: c,
        attrs
    };

    if (!children) {
        return renderComponentWithNoChildren(componentData);
    }

    if (children.component) {
        return renderComponentWithSingleComponentChild({
            child: children,
            ...componentData
        });
    } else if (Array.isArray(children)) {
        const componentChildren = children.map((currentChild, key) => {
            if (currentChild.component) {
                return (renderComponent(
                    currentChild.component,
                    {
                        key,
                        ...currentChild.attrs
                    },
                    currentChild.children)
                );
            }
            return currentChild;
        });

        const component = (
            <componentData.component {...componentData.attrs}>
                { componentChildren }
            </componentData.component>
        );

        return component;
    }

    return renderComponentWithSingleChild({ children, ...componentData });
};

const getAttributesFromModifiers = (modifiers) => {
    const modifierAttrs = {};
    modifiers.forEach(
        (modif) => {
            const value = modif.value;
            if (typeof value !== 'object') {
                modifierAttrs[value] = true;
            } else {
                const keys = Object.keys(modif.value);
                keys.forEach((key) => {
                    modifierAttrs[key] = value[key];
                });
            }
        }
    );
    return modifierAttrs;
};

const mergeAttrs = (attrs1, attrs2) => (Object.assign({}, attrs1, attrs2));

const renderComponentWithModifiersAndChildren = (type, modifiers, children, shallowRender = false) => {
    const component = type.component;

    if (component) {
        const typeAttrs = type.attrs;
        const modifierAttrs = getAttributesFromModifiers(modifiers);

        if (shallowRender) {
            return shallow(renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children));
        }

        return renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children);
    }

    return null;
};

export default renderComponentWithModifiersAndChildren;
