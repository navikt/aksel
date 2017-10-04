import { // eslint-disable-line import/no-extraneous-dependencies
    Textarea,
    TextareaControlled
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved

import { createSampleData, newType, newMultipleChoiceModifier } from './../sampleDataHelper';

const types = [
    newType(TextareaControlled, 'Vanlig', null, { label: 'Textarea-label', maxLength: 20 })
];

const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled'),
    newMultipleChoiceModifier({
        feil: {
            feilmelding: 'Her ble det feil'
        }
    }, 'Med feil')
];

export default createSampleData(types, modifiers, Textarea);
