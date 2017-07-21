import React from 'react';

import { ComponentGuidelinePage } from '../../ui/containers/component/guidelines/ComponentGuidelinePage';
import { Components as components } from './../../data';

export const resolveComponentRoutes = (routePrefix) => {
    return components.map((component) => {
        return {
            path: ('/' + routePrefix + '/' + (component.componentName)).toLowerCase(),
            component: () => {
                return (
                    <ComponentGuidelinePage { ... component } />
                );
            },
            title: component.label
        }
    });
};