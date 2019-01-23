import React from 'react';
import { BrowserRouter as Router, withRouter, Switch } from 'react-router-dom';
import { routes } from './../../../utils/routing/routes.component';

import Header from './../../components/header/Header';
import Breadcrumbs from './../../components/breadcrumbs/Breadcrumbs';

// eslint-disable-next-line import/extensions

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };

        props.history.listen((location) => {
            /*
                Must use `window.location` instead of `location` here because empty hash from
                tab navigation is not present on `location` object.
            */
            if (window.location.href.indexOf('#') === -1) {
                const contentPane = document.getElementsByClassName('mainContent')[0];
                contentPane.scrollTop = 0;
                window.scrollTo(0,0);
            }
        });
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    render() {
        return (
            <div className="mainWrapper">
                <Header />
                <Breadcrumbs />
                <div className="contentWrapper">
                    <Switch>
                        { routes() }
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);