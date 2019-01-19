import React from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import routeConfig from '../../../utils/routing/routes.config';
import { GithubLogo } from '../../../assets/images/svg';

import MobileNavMenuItem from './MobileNavMenuItem';

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

    renderRoute = (route, index) => {
        const open = (this.props.history.location.pathname.indexOf(route.path) !== -1) && route['routes'];
        return (
            <MobileNavMenuItem open={open} route={route} index={index} key={index}>
                {
                    route['routes'] && 
                    <ul>
                        { route.routes.map((route, index) => this.renderRoute(route, index)) }
                    </ul>
                }
            </MobileNavMenuItem>
        );
    };

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
                        {routeConfig.map((route, index) => this.renderRoute(route, index))}
                        <li><a href="https://github.com/navikt/nav-frontend-moduler" target="_blank" className="github"><GithubLogo />Github</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(MobileNav);