import React from 'react';
import { NavLink } from 'react-router-dom';

import { NAVLogo } from '../../../assets/images/svg';
import MainNav from '../main-nav/MainNav';
import MobileNav from '../mobile-nav/MobileNav';
import MobileNavToggle from '../mobile-nav-toggle/MobileNavToggle';
import { getViewportDimensions } from 'NavFrontendModules/nav-frontend-js-utils';

import './styles.less';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile: false,
            mobileNavOpen: false
        };

        window.addEventListener('resize', this.checkViewport);
    }

    componentDidMount() {
        this.checkViewport();
        console.log(this.toggleBtn);
    }

    checkViewport = () => {
        const viewport = getViewportDimensions();
        if (viewport.w < 1094 && !this.state.mobile) {
            this.setState({ mobile: true });
        } else if (viewport.w >= 1094 && this.state.mobile) {
            this.setState({ mobile: false });
        }
    }

    toggleMobileNav = () => {
        this.setState({
            mobileNavOpen: !!!this.state.mobileNavOpen
        }, () => {
            if (!this.state.mobileNavOpen) {
                this.toggleBtn.focus();
            }
        });
    }

    render() {
        const ariaHidden = (this.state.mobile) ? { 'aria-hidden': !!this.state.mobileNavOpen } : undefined ;
        return (
            <React.Fragment>
                <header className="header">
                    <a href="#hovedinnhold" id="skip-link">Hopp til innhold</a>
                    <div className="header__content">
                        <NavLink to="/" className="header__logo">
                            <NAVLogo />
                            <div className="header__title">
                                Designsystemet
                            </div>
                        </NavLink>
                        <MobileNavToggle
                            innerRef={(node) => this.toggleBtn = node}
                            onClick={() => this.toggleMobileNav()} {...ariaHidden}
                        />
                        <MainNav />
                    </div>
                </header>
                <MobileNav open={this.state.mobileNavOpen} toggle={this.toggleMobileNav} />
            </React.Fragment>
        );
    }
}

export default Header;
