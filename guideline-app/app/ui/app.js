import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './../redux';
import App from './containers/app/App';

const basename = window.location.href.indexOf('localhost') !== -1 ? undefined : '/dev/nav/nye-docs';

render(
    <Provider store={store}>
        <Router basename={basename}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
