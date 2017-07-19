import React from 'react';

import { Route } from 'react-router-dom';

import { routeConfig } from './routes.config';

export const RouteWithSubRoutes = (route) => (
    <Route
        exact={ route.exact }
        path={ route.path }
        render={
            (props) => (
                <route.component
                    routes={ route.routes }
                    { ...props }
                />
            )
        }
    />
);

export const routes = () => {
    return (
        <div>
            {
                routeConfig.map((route, i) => {
                    return (
                        <RouteWithSubRoutes
                            key={ i }
                            { ... route }
                        />
                    );
                })
            }
        </div>
    )
};