import React from 'react';
import { SkjemaGruppe, Checkbox } from './../../../../../packages/node_modules/nav-frontend-skjema';

const SkjemaGruppeComp = (props) => {
    const errorMessage = { feilmelding:'Feil! Velg minst et valg' };

    return (
        <SkjemaGruppe title="Hvor vil du sitte?" feil={ props.hasError ? errorMessage : null }>
            <Checkbox label="Bakerst" value="bakerst" id="bakerst-checkbox" name="bakerst" />
            <Checkbox label="Fremst" value="fremst" id="fremst-checkbox" name="fremst" />
            <Checkbox label="Midten" value="midten" id="midten-checkbox" name="midten" />
        </SkjemaGruppe>
    )
};

const skjemagruppe = {
    children: '',
    types: [
        {
            component: () => <SkjemaGruppeComp />,
            label: 'Vanlig',
            _default: true
        },
        {
            component: () => <SkjemaGruppeComp hasError="true" />,
            label: 'Med feilmelding',
            _default: true
        }
    ]
};

export default skjemagruppe;