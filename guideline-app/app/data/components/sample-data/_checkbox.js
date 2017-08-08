import {
    Checkbox
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const checkbox = {
    base: Checkbox,
    types: [
        {
            component: Checkbox,
            label: 'Vanlig',
            attrs: { label: 'Checkboxfelt-label' },
            _default: true
        },
        {
            component: Checkbox,
            label: 'Med feilmelding',
            attrs: {
                label: 'Checkboxfelt-label',
                feil: {
                    feilmelding: 'Feil!'
                }
            }
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default checkbox;
