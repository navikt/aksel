import React from 'react';
import { Route } from 'react-router-dom';
import routeConfig from './routes.config';

export const RouteWithSubRoutes = (route) => (
    <Route
        exact={route.exact}
        path={route.path}
        render={
            (props) => (
                <route.component
                    routes={route.routes}
                    {...props}
                />
            )
        }
    />
);

export const routes = () => (
    <div>
        {
            routeConfig.map((route, i) =>
                (<RouteWithSubRoutes
                    key={i} // eslint-disable-line react/no-array-index-key
                    {...route}
                />)
            )
        }
    </div>
);
