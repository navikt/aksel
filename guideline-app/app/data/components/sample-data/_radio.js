import {
    Radio
} from 'NavFrontendModules/nav-frontend-skjema';
import { createSampleData, newType, newMultipleChoiceModifier } from './../sampleDataHelper';

const types = [
    newType(Radio, 'Vanlig', null, { label: 'Radio-label', name: 'radio' })
];

const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled')
];

export default createSampleData(types, modifiers);