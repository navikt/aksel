import React from 'react';
import PT from 'prop-types';
import { RouteWithSubRoutes } from './routes.component';

const SubRoutesWrapper = (props) => (
    <div>
        {
            props.routes.map((route, i) => {
                if (route.routes && route.routes.length > 0) {
                    return (
                        <SubRoutesWrapper
                            key={i} // eslint-disable-line react/no-array-index-key
                            {...route}
                        />
                    );
                }
                return (
                    <RouteWithSubRoutes
                        key={i} // eslint-disable-line react/no-array-index-key
                        {...route}
                    />
                );
            })
        }
    </div>
);

SubRoutesWrapper.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default SubRoutesWrapper;
