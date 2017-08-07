import {
    Radio
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const radio = {
    base: Radio,
    types: [
        {
            component: Radio,
            attrs: {
                label: 'Radio-label',
                name: 'radio'
            },
            label: 'Vanlig',
            _default: true
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default radio;
