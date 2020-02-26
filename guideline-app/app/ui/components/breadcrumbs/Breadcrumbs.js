import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import routeConfig from '../../../utils/routing/routes.config';

import './styles.less';

const getBreadcrumbs = (path) => {
    const breadcrumbs = [];
    const pathParts = path.split('/');
    pathParts.shift();

    const recursiveTraverse = (routeArray, pathIndex) => {
        const currentPath = `/${[].concat(pathParts.slice(0, pathIndex + 1)).join('/')}`;
        const route = routeArray.find((subRoute) => subRoute.path === currentPath);

        if (route) {
            breadcrumbs.push(route);
            if (route.routes) recursiveTraverse(route.routes, pathIndex + 1);
        }
    };

    recursiveTraverse(routeConfig, 0);

    return breadcrumbs;
};

const Breadcrumbs = (props) => {
    const breadcrumbs = getBreadcrumbs(props.history.location.pathname);

    return (
        <nav className="breadcrumbs" aria-label="breadcrumbs">
            <ul>
                {
                    breadcrumbs.map((breadcrumb, index) => {
                        if (index < (breadcrumbs.length - 1)) {
                            return (
                                <li key={breadcrumb.title}>
                                    <NavLink className="lenke" to={breadcrumb.path}>
                                        {breadcrumb.title}
                                    </NavLink>
                                </li>
                            );
                        }
                        return (<li key={breadcrumb.title}>{breadcrumb.title}</li>);
                    })
                }
            </ul>
        </nav>
    );
};

export default withRouter(Breadcrumbs);
