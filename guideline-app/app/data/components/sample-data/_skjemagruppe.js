import { SkjemaGruppe, Checkbox } from 'NavFrontendModules/nav-frontend-skjema';

import { createSampleData, newType } from './../sampleDataHelper';

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

const types = [
    newType(SkjemaGruppe, 'Vanlig', checkboxChildren, { title: 'Hvor vil du sitte?' }),
    newType(SkjemaGruppe, 'Med feilmelding', checkboxChildren, {
        title: 'Hvor vil du sitte?',
        feil: { feilmelding: 'Feil! Velg minst et valg' }
    })
];

export default createSampleData(types);