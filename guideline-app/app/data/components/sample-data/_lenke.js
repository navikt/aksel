import React from 'react';
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

const LenkeComp = (props) => {
    return (
        <div className="nav-frontend-lenker">
            {
                !props.frittstaende &&
                <p>
                    Dette er en	&nbsp;
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
    )
};

const lenke = {
    children: '',
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