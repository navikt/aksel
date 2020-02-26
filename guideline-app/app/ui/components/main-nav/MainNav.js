import React from 'react';
import { NavLink } from 'react-router-dom';

import routeConfig from './../../../utils/routing/routes.config';
import { GithubLogo } from './../../../assets/images/svg';

import './styles.less';

const MainNav = () => (
    <nav className="mainNav" aria-label="Hoved">
        <div className="mainNav__wrapper">
            <ul>
                {
                    routeConfig.filter((item) => item.path && item.path !== '/new-project').map((item, index) =>
                        (
                            <li key={item.title}>
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
                <div style={{'flexGrow': 1}} />
                <li>
                    <a
                        href="https://github.com/navikt/nav-frontend-moduler"
                        className="github"
                    >
                        <GithubLogo />
                        Github
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

export default MainNav;
