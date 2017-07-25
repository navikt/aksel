import {
    Textarea
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const textarea = {
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
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default textarea;
