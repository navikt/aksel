import React from 'react';

import {
    Select
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const SelectComp = (props) => (
    <Select { ... props } label='Hvilket land er best om sommeren?'>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
    </Select>
);

const select = {
    types: [
        { component: SelectComp, label: 'Vanlig', _default: true }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default select;
