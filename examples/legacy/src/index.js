// Skrevet i ES5 så man slipper babel-avhengighet for eksempelprosjektet
const React = require('react');
const ReactDOM = require('react-dom');
const Etiketter = require('nav-frontend-etiketter');
const Paneler = require('nav-frontend-paneler');

const createElement = React.createElement;
const Panel = Paneler.Panel;
const AdvarselEtikett = Etiketter.EtikettAdvarsel;

function Application() {
    return createElement('div', {},
        createElement(Panel, {},
            createElement('h1', {}, 'Test')
        ),
        createElement(Panel, {},
            createElement(AdvarselEtikett, {}, 'Oops')
        )
    );
}

ReactDOM.render(createElement(Application), document.getElementById('application'));
