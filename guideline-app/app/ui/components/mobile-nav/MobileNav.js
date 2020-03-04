import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Lukknapp } from 'NavFrontendModules/nav-frontend-ikonknapper';

import routeConfig from '../../../utils/routing/routes.config';
import { GithubLogo } from '../../../assets/images/svg';

import MobileNavMenuItem from './MobileNavMenuItem';

import './styles.less';

const cls = (props, state) => classnames('mobile-nav', {
    'mobile-nav--open': props.open,
    'mobile-nav--hidden': state.hidden
});

class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        };
        window.addEventListener('keydown', this.handleKeyPress);
        window.addEventListener('click', this.handleClick);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            window.clearInterval(this.timer);

            this.setState({
                hidden: false
            });

            this.timer = null;

            ReactDOM.findDOMNode(this.lukkBtn).focus();
        } else {
            this.timer = window.setTimeout(() => this.setState({ hidden: true }), 200);
        }
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 27 && this.props.open && !this.timer) {
            this.props.toggle();
        }
    }

    handleClick = (e) => {
        if (!this.state.hidden && e.target === this.bg && !this.timer) {
            this.props.toggle();
        }
    }

    renderRoute = (route, index) => {
        const open = (this.props.history.location.pathname.indexOf(route.path) !== -1) && route.routes;
        return (
            <MobileNavMenuItem open={open} route={route} index={index} key={index}>
                {
                    route.routes &&
                    <ul>
                        {
                            route.routes.filter((subRoute) => subRoute.path !== '/new-project').map(
                                (filteredRoute, i) => this.renderRoute(filteredRoute, i)
                            )
                        }
                    </ul>
                }
            </MobileNavMenuItem>
        );
    };

    render() {
        return (
            <div
                ref={(node) => { this.bg = node; }}
                className={cls(this.props, this.state)}
                aria-hidden={this.state.hidden}
            >
                <nav className="mobile-nav__drawer" aria-label="main mobile">
                    <Lukknapp
                        className="mobile-nav__close-btn"
                        onClick={this.props.toggle}
                        ref={(node) => this.lukkBtn = node}
                    >
                        <span className="sr-only">Lukk meny</span>
                    </Lukknapp>
                    <ul className="nav-list">
                        {
                            routeConfig.filter((route) => route.path).map((route, index) =>
                                this.renderRoute(route, index)
                            )
                        }
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
                </nav>
            </div>
        );
    }
}

export default withRouter(MobileNav);
