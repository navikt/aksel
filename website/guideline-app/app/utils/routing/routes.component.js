import React from "react";
import { Route } from "react-router-dom";
import DocumentTitle from "react-document-title";
import routeConfig from "./routes.config";

export const RouteWithSubRoutes = (route) => (
  <Route
    exact={route.exact}
    path={route.path}
    render={() => (
      <DocumentTitle title={`${route.title} - NAV Designsystem`}>
        <route.component {...route} />
      </DocumentTitle>
    )}
  />
);

export const routes = () =>
  routeConfig.map((route, i) => (
    <RouteWithSubRoutes
      key={i} // eslint-disable-line react/no-array-index-key
      {...route}
    />
  ));
