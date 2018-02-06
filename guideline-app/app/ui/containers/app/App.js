import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { routes } from './../../../utils/routing/routes.component';
import Header from './../../components/header/Header';
import LeftNavigation from './../../components/left-navigation/LeftNavigation';
// eslint-disable-next-line import/extensions
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

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
                <div className="app">
                    <div style={{ position: 'relative', marginBottom: '80px' }}>
                        <div>
                            <LeftNavigation show={this.state.showMenu} toggle={this.toggleMenu} />
                        </div>
                        <div className="contentWrapper">
                            <Header />
                            { routes() }
                        </div>
                        <button
                            id="mobileMenuToggleButton"
                            className="mobileMenuToggleButton"
                            onClick={this.toggleMenu}
                        >
                            <span className="mobileMenuToggleButton__hamburger-icon">Åpne meny</span>
                        </button>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
