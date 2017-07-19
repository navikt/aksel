import React from 'react';

import {
    Radio
} from 'nav-frontend-skjema';

const RadioComp = (props) => (<Radio { ... props } label='Radio-label' name='radio' />);

const radio = {
    types: [
        { component: (props) => (<RadioComp disabled={ props.disabled } />), label: 'Vanlig', _default: true }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default radio;
