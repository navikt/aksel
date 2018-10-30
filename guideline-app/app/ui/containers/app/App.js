import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './../../../utils/routing/routes.component';

import Header from './../../components/header/Header';
import MainNav from './../../components/main-nav/MainNav';
import LeftNavigation from './../../components/left-navigation/LeftNavigation';

// eslint-disable-next-line import/extensions

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    render() {
        return (
            <Router>
                <div className="mainWrapper">
                    <Header />
                    <div className="contentWrapper">
                        { routes() }
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
