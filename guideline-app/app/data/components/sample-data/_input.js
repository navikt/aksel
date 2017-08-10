import {
    Input
} from 'NavFrontendModules/nav-frontend-skjema';

const input = {
    types: [
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 'xxs'
            },
            label: 'XXS'
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 'xs'
            },
            label: 'XS'
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 's'
            },
            label: 'Liten'
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label'
            },
            label: 'Fullbredde',
            _default: true
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 'l'
            },
            label: 'Stor'
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 'xl'
            },
            label: 'XL'
        },
        {
            component: Input,
            attrs: {
                label: 'Inputfelt-label',
                bredde: 'xxl'
            },
            label: 'XXL'
        }
    ],
    multipleChoiceModifiers: [
        { value: 'disabled', label: 'Disabled' },
        {
            value: {
                feil: {
                    feilmelding: 'Her ble det feil gitt'
                }
            },
            label: 'Med feil'
        }
    ]
};

export default input;
