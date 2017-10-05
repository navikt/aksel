import React from 'react';

import ComponentGuidelinePage from '../../ui/containers/component/guidelines/ComponentGuidelinePage';
import { Components as components } from './../../data';

const resolveComponentRoutes = (routePrefix) => (
    components.map((component) => {
        const path = `/${routePrefix}/${component.componentData.componentName}`;

        return {
            path: path.toLowerCase(),
            component: () => (<ComponentGuidelinePage {...component} />),
            title: component.componentData.label
        };
    })
);

export default resolveComponentRoutes;
