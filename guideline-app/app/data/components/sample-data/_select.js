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

const allSelectTypes = [
    { label: 'Fullbredde', _default: true },
    { bredde: 'xxl', label: 'XXL' },
    { bredde: 'xl', label: 'XL' },
    { bredde: 'l', label: 'Stor' },
    { bredde: 'm', label: 'Medium' },
    { bredde: 's', label: 'Liten' },
    { bredde: 'xs', label: 'XS' }
].map((selectType) => ({
    component: Select,
    attrs: {
        label: 'Hvilket land er best om sommeren?',
        bredde: selectType.bredde
    },
    children: optionChildren(),
    label: selectType.label,
    _default: selectType._default
}));

const select = {
    base: Select,
    types: allSelectTypes,
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' },
        {
            value: {
                feil: {
                    feilmelding: 'Her ble det feil altså.'
                }
            },
            label: 'Med feil'
        }
    ]
};

export default select;
