import React from 'react';
import classnames from 'classnames';

import Lukknapp from 'NavFrontendModules/nav-frontend-lukknapp';

import './styles.less';

const cls = (props) => classnames('mobile-nav', {
    'mobile-nav--open': props.open
});

class MobileNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false
        };
    }

    render(){
        return (
            <div className="mobile-nav" {...this.props}>
                <nav className="mobile-nav__drawer">
                    <Lukknapp className="mobile-nav__close-btn">Lukk meny</Lukknapp>
                    <ul className="nav-list">
                        <li><a href="#">Kom i gang</a></li>
                        <li><a href="#">Komponenter</a></li>
                        <li className="open">
                            <a href="#">Ressurser</a>
                            <ul>
                                <li><a href="#">Farger</a></li>
                                <li><a href="#" className="active">Ikoner</a></li>
                                <li><a href="#">Illustrasjoner</a></li>
                                <li><a href="#">Tilgjengelighet</a></li>
                                <li><a href="#">Slik skriver vi</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Maler</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default MobileNav;