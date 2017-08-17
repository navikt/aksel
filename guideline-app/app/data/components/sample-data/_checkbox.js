import {
    Checkbox
} from 'NavFrontendModules/nav-frontend-skjema';

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const feilAttrs = { feil: { feilmelding: 'Feil!' } };
const types = [
    newType(Checkbox, 'Vanlig', null, { label: 'Checkboxfelt-label' }),
    newType(Checkbox, 'Med feilmelding', null, { label: 'Checkboxfelt-label', ... feilAttrs })
];
const modifiers = [ newMultipleChoiceModifier('disabled', 'Disabled') ];

export default createSampleData(types, modifiers);
