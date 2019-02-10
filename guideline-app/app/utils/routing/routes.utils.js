import React from 'react';
import ComponentGuidelinePage from '../../ui/containers/components/component/ComponentGuidelinePage';
import { Components as components } from './../../data';
import routeConfig from './routes.config';

const getTopLevelComponentRoutes = (routePrefix) => (
    components.map((component) => {
            const path = `/${routePrefix}/${component.componentData.name}`;
            return {
                path: path.toLowerCase(),
                component: () => (<ComponentGuidelinePage {...component} />),
                title: component.componentData.name,
                data: component.componentData
            };
        }));

const sortRoutesAlphabetically = (route1, route2) => {
    if (route1.path > route2.path) {
        return 1;
    } else if (route2.path > route1.path) {
        return -1;
    }
    return 0;
};

const resolveComponentRoutes = (routePrefix) => {
    const componentRoutes = getTopLevelComponentRoutes(routePrefix);
    return componentRoutes.sort(sortRoutesAlphabetically);
};

const getRoutePaths = (paths, route) => {
    paths.push(route.path);
    if (route.routes) {
        route.routes.forEach(route => getRoutePaths(paths, route));
    }
};

export const getFlattenedPaths = () => {
    let paths = [];
    routeConfig.forEach(route => getRoutePaths(paths, route));
    return paths;
};

export default resolveComponentRoutes;
