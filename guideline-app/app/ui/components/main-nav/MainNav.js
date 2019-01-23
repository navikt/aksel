import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import routeConfig from './../../../utils/routing/routes.config';
import { GithubLogo } from './../../../assets/images/svg';

import './styles.less';

const MainNav = () => (
    <nav className="mainNav">
        <div className="mainNav__wrapper">
            <ul>
                {
                    routeConfig.filter((item) => item['path']).map((item, index) => 
                        (
                            <li key={index}>
                                <NavLink
                                    exact={index === 0}
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
            <ul>
                <li><a href="https://github.com/navikt/nav-frontend-moduler" target="_blank" className="github"><GithubLogo />Github</a></li>
            </ul>
        </div>
    </nav>
);

export default MainNav;