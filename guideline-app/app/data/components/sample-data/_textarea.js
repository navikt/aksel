import {
    Textarea
} from 'NavFrontendModules/nav-frontend-skjema';

const textarea = {
    base: Textarea,
    types: [
        {
            component: Textarea,
            attrs: {
                label: 'Textarea-label',
                onChange: () => {},
                value: ''
            },
            label: 'Vanlig',
            _default: true
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' },
        {
            value: {
                feil: {
                    feilmelding: 'Her ble det feil!'
                }
            },
            label: 'Med feil'
        }
    ]
};

export default textarea;
