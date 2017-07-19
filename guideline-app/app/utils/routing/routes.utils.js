import React from 'react';

import { ComponentSpecPage } from '../../ui/containers/component/spec/ComponentPage.spec';
import { Components as components } from './../../data';

export const resolveComponentRoutes = (routePrefix) => {
    return components.map((component) => {
        return {
            path: ('/' + routePrefix + '/' + (component.componentName)).toLowerCase(),
            component: () => {
                return (
                    <ComponentSpecPage { ... component } />
                );
            },
            title: component.label
        }
    });
};