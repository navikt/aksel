import React from 'react';

import {
    Input
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const InputComp = (props) => (<Input { ... props } label='Inputfelt-label' />);

const input = {
    types: [
        { component: (props) => (<InputComp disabled={ props.disabled } />), label: 'Vanlig', _default: true }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default input;
