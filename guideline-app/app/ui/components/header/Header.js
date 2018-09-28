import React from 'react';

import NAVLogo from '../nav-logo/nav-logo';
import MainNav from '../main-nav/MainNav';

import './styles.less';

const Header = () => (
    <header className="header">
        <div className="header__content">
            <a href="#" className="header__logo">
                <NAVLogo />
                <h1 className="header__title">
                    Designsystemet
                </h1>
            </a>
            <MainNav />
        </div>
    </header>
);

export default Header;
