import { createSampleData, newType, newMultipleChoiceModifier } from './../sampleDataHelper';

import {
    Textarea,
    TextareaControlled
} from 'NavFrontendModules/nav-frontend-skjema';

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