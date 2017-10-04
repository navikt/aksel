import { // eslint-disable-line import/no-extraneous-dependencies
    Checkbox
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const feilAttrs = { feil: { feilmelding: 'Feil!' } };
const types = [
    newType(Checkbox, 'Vanlig', null, { label: 'Checkboxfelt-label' }),
    newType(Checkbox, 'Med feilmelding', null, { label: 'Checkboxfelt-label', ...feilAttrs })
];
const modifiers = [newMultipleChoiceModifier('disabled', 'Disabled')];

export default createSampleData(types, modifiers);
