import React from 'react';
import { Route } from 'react-router-dom';

import { SectionTitle } from './../section-title/SectionTitle';

export const TitleByRoute = (props) => {
    const renderTitleByRoute = () => {
        return props.routes.map((route, index) => {
            return (
                <Route
                    key={ index }
                    exact={ route.exact }
                    path={ route.path }
                    component={
                        () => (
                            <SectionTitle title={route.title} { ... props } />
                        )
                    }
                />
            )
        });
    };

    return (
        <div>{ renderTitleByRoute() }</div>
    );
};