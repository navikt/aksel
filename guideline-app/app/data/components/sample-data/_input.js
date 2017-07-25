import {
    Input
} from './../../../../../packages/node_modules/nav-frontend-skjema';

const input = {
    types: [
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label'
            },
            label: 'Vanlig',
            _default: true
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default input;
