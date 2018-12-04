import React from 'react';

import NAVLogo from '../nav-logo/nav-logo';
import MainNav from '../main-nav/MainNav';
import MobileNav from '../mobile-nav/MobileNav';
import MobileNavToggle from '../mobile-nav-toggle/MobileNavToggle';

import './styles.less';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mobileNavOpen: false
        };
    }

    render() {
        return (
            <header className="header">
                <div className="header__content">
                    <a href="#" className="header__logo">
                        <NAVLogo />
                        <h1 className="header__title">
                            Designsystemet
                        </h1>
                    </a>
                    <MobileNavToggle onClick={() => this.setState({mobileNavOpen: !this.state.mobileNavOpen})} />
                    <MainNav />
                    <MobileNav open={this.state.mobileNavOpen} />
                </div>
            </header>
        );
    }
}

export default Header;
