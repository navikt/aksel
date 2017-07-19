import React from 'react';

import {
    Textarea
} from 'nav-frontend-skjema';

const TextareaComp = (props) => {
    return (
        <Textarea
            { ... props }
            label='Textarea-label'
            onChange={ () => {} }
            value=""
        />
    );
};

const textarea = {
    types: [
        { component: TextareaComp, label: 'Vanlig', _default: true }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default textarea;
