import React from 'react';
import PT from 'prop-types';
import { Route } from 'react-router-dom';

const TitleByRoute = (props) => props.routes.filter((route) => route.path).map((route, index) => (
    <Route
        key={index} // eslint-disable-line react/no-array-index-key
        exact={route.exact}
        path={route.path}
        component={() => route.title}
    />
));

TitleByRoute.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default TitleByRoute;
