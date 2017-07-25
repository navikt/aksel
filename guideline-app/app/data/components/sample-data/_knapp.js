import {
    Knapp,
    Hovedknapp,
    Fareknapp
} from './../../../../../packages/node_modules/nav-frontend-knapper';

import { fillTypesAndModifiersWithCommonValue } from './../../../utils/data/data.utils';

const knapp = {
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

const COMMON_VALUE = 'Slik ser en knapp ut';
knapp.types = fillTypesAndModifiersWithCommonValue(knapp.types, COMMON_VALUE);

export default knapp;