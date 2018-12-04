import React from 'react';
import classnames from 'classnames';

import Lukknapp from 'NavFrontendModules/nav-frontend-lukknapp';

import './styles.less';

const cls = (props, state) => classnames('mobile-nav', {
    'mobile-nav--open': props.open,
    'mobile-nav--hidden': state.hidden
});

class MobileNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: true
        };
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            window.clearInterval(this.timer);
            this.setState({
                hidden: false
            });
            this.timer = null;
        } else {
            this.timer = window.setTimeout(() => this.setState({hidden: true}), 200);
        }
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 27 && this.props.open && !this.timer) {
            this.props.toggle();
        }
    }

    handleClick = (e) => {
        if (e.target === this.bg && !this.timer) {
            this.props.toggle();
        }
    }

    render(){
        return (
            <div
                ref={(node) => this.bg = node}
                className={cls(this.props, this.state)}
                onClick={this.handleClick}
                aria-hidden={this.state.hidden}
            >
                <nav className="mobile-nav__drawer">
                    <Lukknapp 
                        className="mobile-nav__close-btn"
                        onClick={this.props.toggle}
                    >
                        Lukk meny
                    </Lukknapp>
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