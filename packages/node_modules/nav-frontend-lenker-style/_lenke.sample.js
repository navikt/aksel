import React from 'react';
import 'NavFrontendModules/nav-frontend-lenker-style'; // eslint-disable-line import/extensions, import/no-unresolved, import/no-extraneous-dependencies

const LenkeComp = (props) => (
    <div className="nav-frontend-lenker">
        {
            !props.frittstaende && // eslint-disable-line react/prop-types
            <p>
                Dette er en &nbsp;
                <a className="lenke">
                    lenke
                </a>
                &nbsp;i en setning
            </p>
        }

        {
            props.frittstaende &&
            <p>
                <a className="lenke lenke--frittstaende">
                    Dette er en frittstående lenke
                </a>
            </p>
        }
    </div>
);

const lenke = {
    react: false,
    types: [
        {
            component: () => (<LenkeComp />),
            label: 'Vanlig lenke',
            _default: true
        },
        {
            component: () => (<LenkeComp frittstaende />),
            label: 'Frittstående lenke'
        }
    ]
};

export default lenke;
