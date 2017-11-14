import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { routes } from './../../../utils/routing/routes.component';
import Header from './../../components/header/Header';
import LeftNavigation from './../../components/left-navigation/LeftNavigation';
// eslint-disable-next-line import/extensions
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Router>
                <div className="app">
                    <Header />
                    <div style={{ position: 'relative', marginBottom: '80px' }}>
                        <div>
                            <LeftNavigation />
                        </div>
                        <div style={{ marginLeft: '304px' }}>
                            <div className="contentWrapper">
                                { routes() }
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
