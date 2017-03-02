// Skrevet i ES5 så man slipper babel-avhengighet for eksempelprosjektet
const React = require('react');
const ReactDOM = require('react-dom');
const Typografi = require('nav-frontend-typografi');
const Etiketter = require('nav-frontend-etiketter');
const Paneler = require('nav-frontend-paneler');
require('./index.less');

const createElement = React.createElement;
const Sidetittel = Typografi.Sidetittel;
const Panel = Paneler.Panel;
const AdvarselEtikett = Etiketter.EtikettAdvarsel;

function Application() {
    return createElement('div', {},
        createElement(Panel, {},
            createElement(Sidetittel, {}, 'Test')
        ),
        createElement(Panel, {},
            createElement(AdvarselEtikett, {}, 'Oops')
        )
    );
}

ReactDOM.render(createElement(Application), document.getElementById('application'));
