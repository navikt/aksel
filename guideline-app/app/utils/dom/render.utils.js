import React from 'react';
import { shallow } from 'enzyme';

const renderComponentWithNoChildren = (componentData) => (
    <componentData.component { ... componentData.attrs } />
);

const renderComponentWithSingleChild = (componentData) => (
    <componentData.component { ... componentData.attrs }>
        { componentData.children }
    </componentData.component>
);

const renderComponentWithSingleComponentChild = (componentData) => (
    <componentData.component { ... componentData.attrs }>
        <componentData.child.component { ... componentData.child.attrs }>
            { componentData.child.children }
        </componentData.child.component>
    </componentData.component>
);

const renderComponent = (c, attrs, children) => {
    const componentData = {
        component: c,
        attrs: attrs
    };

    if (!children) {
        return renderComponentWithNoChildren(componentData);
    }

    if (children.component) {
        return renderComponentWithSingleComponentChild({
            child: children,
            ... componentData
        });
    }

    else if (Array.isArray(children)) {
        const componentChildren = children.map((currentChild, key) => {
            if (currentChild.component) {
                return (renderComponent(
                    currentChild.component,
                    {
                        key: key,
                        ... currentChild.attrs
                    },
                    currentChild.children)
                );
            }
            else {
                return currentChild;
            }
        });

        const component = (
            <componentData.component { ... componentData.attrs }>
                { componentChildren }
            </componentData.component>
        );

        return component;
    }

    return renderComponentWithSingleChild({
        children: children,
        ... componentData
    });
};

const mergeAttrs = (attrs1, attrs2) => (Object.assign({}, attrs1, attrs2));

export const renderComponentWithModifiersAndChildren = (type, modifiers, children, shallowRender = false) => {
    const component = type.component;

    if (component) {
        const typeAttrs = type.attrs;

        let modifierAttrs = {};
        modifiers.forEach((modif) => { modifierAttrs[modif.value] = true; });


        if (shallowRender) {
            return shallow(renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children));
        }

        return renderComponent(component, mergeAttrs(typeAttrs, modifierAttrs), children);
    }
};