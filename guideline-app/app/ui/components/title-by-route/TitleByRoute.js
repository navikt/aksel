import React from 'react';
import PT from 'prop-types';
import { Route } from 'react-router-dom';

import SectionTitle from './../section-title/SectionTitle';

const TitleByRoute = (props) => {
    const renderTitleByRoute = () => (
        props.routes.map((route, index) => (
            <Route
                key={index} // eslint-disable-line react/no-array-index-key
                exact={route.exact}
                path={route.path}
                component={
                    () => (
                        <SectionTitle title={route.title} {... props} />
                    )
                }
            />
        ))
    );

    return (
        <div>{ renderTitleByRoute() }</div>
    );
};

TitleByRoute.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default TitleByRoute;
