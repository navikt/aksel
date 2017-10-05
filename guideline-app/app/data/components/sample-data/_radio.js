import { // eslint-disable-line import/no-extraneous-dependencies
    Radio
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved
import { createSampleData, newType, newMultipleChoiceModifier } from '../../../utils/sampling/sampleDataHelper';

const types = [
    newType(Radio, 'Vanlig', null, { label: 'Radio-label', name: 'radio' })
];

const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled')
];

export default createSampleData(types, modifiers);
