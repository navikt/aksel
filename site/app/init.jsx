import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';

import App from './app.jsx';
// import store from './app-store.js';

var el = document.getElementById('app');

render(<App />, el);

if (module.hot) {
    module.hot.accept();
}