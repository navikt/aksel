import React from 'react';
import PT from 'prop-types';
import { Route } from 'react-router-dom';

import { Innholdstittel } from './../../../../../packages/node_modules/nav-frontend-typografi';
import { EtikettInfo } from './../../../../../packages/node_modules/nav-frontend-etiketter';
import SectionTitle from './../section-title/SectionTitle';

// <SectionTitle title={route.title} {... props} />

const TitleByRoute = (props) => {
    const renderTitleByRoute = () => (
        props.routes.map((route, index) => (
            <Route
                key={index} // eslint-disable-line react/no-array-index-key
                exact={route.exact}
                path={route.path}
                component={
                    () => (
                        <header>
                            <Innholdstittel>{route.title}</Innholdstittel>
                        </header>
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
