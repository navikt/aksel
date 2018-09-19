import React from 'react';
// import routeConfig from './../../../utils/routing/routes.config';
import NAVLogo from '../nav-logo/nav-logo';

import './styles.less';

const Header = () => (
    <div className="header">
        <div className="header__content">
            <a href="#" className="header__logo">
                <NAVLogo />
                <h1 className="header__title">
                    Designsystemet
                </h1>
            </a>
        </div>
    </div>
);

export default Header;
