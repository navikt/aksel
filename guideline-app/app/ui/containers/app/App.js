import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { routes } from './../../../utils/routing/routes.component';
import Header from './../../components/header/Header';
import LeftNavigation from './../../components/left-navigation/LeftNavigation';

import './styles.less';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Router>
                <div className="app">
                    <Header />
                    <div style={{ position: 'relative' }}>
                        <div>
                            <LeftNavigation />
                        </div>
                        <div style={{ left: '304px', position: 'relative', marginRight: '200px' }}>
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
+1