import React from 'react';
import { withRouter, Switch } from 'react-router-dom';

import { routes } from './../../../utils/routing/routes.component';
import urlRemapConfig from './../../../utils/routing/urlRemap.config';

import Header from './../../components/header/Header';
import Breadcrumbs from './../../components/breadcrumbs/Breadcrumbs';

// eslint-disable-next-line import/extensions

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        /*
            Redirect old hash based URLs
        */
        if (props.location.hash.length) {
            const key = Object.keys(urlRemapConfig).find((k) => props.location.hash.indexOf(k) !== -1);
            if (key) {
                props.history.push(props.location.hash.replace(key, urlRemapConfig[key]));
            }
        }

        props.history.listen(() => {
            const contentPane = document.getElementsByClassName('mainContent')[0];
            contentPane.scrollTop = 0;
            window.scrollTo(0, 0);
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
