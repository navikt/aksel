import React from 'react';

import {
    Select
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const options = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark'}
];

const optionChildren = () => options.map((option) =>
    (<option value={ option.value } key={ option.value }>{ option.label }</option>)
);

const select = {
    base: Select,
    types: [
        {
            component: Select,
            attrs: {
                label: 'Hvilket land er best om sommeren?'
            },
            children: optionChildren(),
            label: 'Vanlig',
            _default: true
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default select;
