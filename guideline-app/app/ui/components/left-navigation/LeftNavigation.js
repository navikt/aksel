import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import TitleByRoute from '../title-by-route/TitleByRoute';
import routeConfig from './../../../utils/routing/routes.config';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

class LeftNavigation extends React.Component {
    render() {
        return (
            <aside className="leftNavigation">
                <nav>
                    <Systemtittel><TitleByRoute routes={routeConfig} /></Systemtittel>
                    <ul className="nav-list">
                        { 
                            this.props.routes.map((item, index) => 
                                (
                                    <li key={index}>
                                        <NavLink
                                            activeClassName="active"
                                            to={item.path}
                                        >
                                            { item.title }
                                        </NavLink>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>
            </aside>
        );
    }
}

export default LeftNavigation;
