import React from 'react';
import { SkjemaGruppe, Checkbox } from './../../../../../packages/node_modules/nav-frontend-skjema';

const options = [
    { label: 'Bakerst', value: 'bakerst', id: 'bakerst-checkbox', name: 'bakerst' },
    { label: 'Fremst', value: 'fremst', id: 'fremst-checkbox', name: 'fremst' },
    { label: 'Midten', value: 'midten', id: 'midten-checkbox', name: 'midten' }
];

const checkboxChildren = (
    options.map((checkboxChildProps) => ({
        component: Checkbox,
        attrs: checkboxChildProps
    }))
);

const skjemagruppe = {
    children: '',
    types: [
        {
            component: SkjemaGruppe,
            children: checkboxChildren,
            label: 'Vanlig',
            attrs: {
                title: 'Hvor vil du sitte?'
            },
            _default: true
        },
        {
            component: SkjemaGruppe,
            children: checkboxChildren,
            label: 'Med feilmelding',
            attrs: {
                title: 'Hvor vil du sitte?',
                feil: { feilmelding: 'Feil! Velg minst et valg' }
            },
            _default: true
        }
    ]
};

export default skjemagruppe;