import { createSampleData, newType, newMultipleChoiceModifier } from './../sampleDataHelper';

import {
    Textarea
} from 'NavFrontendModules/nav-frontend-skjema';

const types = [ newType(Textarea, 'Vanlig', null, { label: 'Textarea-label', onChange: () => {}, value: '' })];
const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled'),
    newMultipleChoiceModifier({
        feil: {
            feilmelding: 'Her ble det feil'
        }
    }, 'Med feil')
];

export default createSampleData(types, modifiers);