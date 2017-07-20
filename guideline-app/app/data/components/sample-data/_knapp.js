import {
    Knapp,
    Hovedknapp,
    Fareknapp
} from './../../../../../packages/node_modules/nav-frontend-knapper';

const knapp = {
    children: 'Slik ser en knapp ut',
    types: [
        {
            component: Knapp,
            label: 'Standard',
            _default: true
        },
        {
            component: Hovedknapp,
            label: 'Hovedknapp',
        },
        {
            component: Fareknapp,
            label: 'Fareknapp',
        }
    ],
    multipleChoiceModifiers: [
        { value: 'mini', label: 'Mini' },
        { value: 'spinner', label: 'Spinner', },
        { value: 'disabled', label: 'Disabled' }
    ]
};

export default knapp;