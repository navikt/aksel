import React from 'react';

import {
    Checkbox
} from 'nav-frontend-skjema';

const CheckboxComp = (props) => (<Checkbox { ... props } label='Checkboxfelt-label' />);

const checkbox = {
    types: [
        { component: (props) => (<CheckboxComp disabled={ props.disabled } />), label: 'Vanlig', _default: true }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default checkbox;
