import React from 'react';
import ComponentGuidelinePage from '../../ui/containers/component/guidelines/ComponentGuidelinePage';
import { Components as components } from './../../data';

const parents = {
    Skjemaelementer: {
        path: '/components/skjemaelementer',
        component: () => (<h2>Skjemaelementer</h2>),
        childComponents: ['checkbox', 'input', 'textarea', 'radio', 'select', 'skjemagruppe']
    },
    Paneler: {
        path: '/components/paneler',
        component: () => (<h2>Paneler</h2>),
        childComponents: ['panel']
    }
};

const getNestedComponents = () => (
    components.filter((component) => {
        const componentName = component.componentData.componentName;
        return Object.keys(parents).some((nestingName) =>
            (parents[nestingName].childComponents.indexOf(componentName) >= 0)
        );
    })
);

const getTopLevelComponentRoutes = (routePrefix, componentsToExclude) => (
    components
        .filter((component) => componentsToExclude.indexOf(component) < 0)
        .map((component) => {
            const path = `/${routePrefix}/${component.componentData.componentName}`;
            return {
                path: path.toLowerCase(),
                component: () => (<ComponentGuidelinePage {...component} />),
                title: component.componentData.label
            };
        }));

const getNestedComponentRoutes = (nestedComponents) => {
    const parentKeys = Object.keys(parents);
    return parentKeys.map((parentKey) => {
        const parent = parents[parentKey];
        const children = nestedComponents.filter((component) => {
            const componentName = component.componentData.componentName;
            return parent.childComponents.indexOf(componentName) >= 0;
        });

        const subRoutes = children.map((child) => {
            const path = `${parent.path}/${child.componentData.componentName}`;
            return {
                path: path.toLowerCase(),
                component: () => (<ComponentGuidelinePage {...child} />),
                title: child.componentData.label
            };
        });

        return {
            path: parent.path,
            component: parent.component,
            title: parentKey,
            routes: subRoutes
        };
    });
};

const sortRoutesAlphabetically = (route1, route2) => {
    if (route1.path > route2.path) {
        return 1;
    } else if (route2.path > route1.path) {
        return -1;
    }
    return 0;
};

const resolveComponentRoutes = (routePrefix) => {
    const nestedComponents = getNestedComponents();
    const topLevelComponentRoutes = getTopLevelComponentRoutes(routePrefix, nestedComponents);
    const nestedComponentRoutes = getNestedComponentRoutes(nestedComponents);
    return [...topLevelComponentRoutes, ...nestedComponentRoutes].sort(sortRoutesAlphabetically);
};

export default resolveComponentRoutes;
