import React from 'react';
import { NavLink } from 'react-router-dom';

import { NAVLogo } from '../../../assets/images/svg';
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

    toggleMobileNav = () => {
        this.setState({
            mobileNavOpen: !this.state.mobileNavOpen
        });
    }

    render() {
        return (
            <header className="header">
                <div className="header__content">
                    <NavLink to="/" className="header__logo">
                        <NAVLogo />
                        <h1 className="header__title">
                            Designsystemet
                        </h1>
                    </NavLink>
                    <MobileNavToggle onClick={() => this.toggleMobileNav()} />
                    <MainNav />
                    <MobileNav open={this.state.mobileNavOpen} toggle={this.toggleMobileNav} />
                </div>
            </header>
        );
    }
}

export default Header;
