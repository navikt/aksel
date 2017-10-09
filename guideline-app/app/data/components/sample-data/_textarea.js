import { // eslint-disable-line import/no-extraneous-dependencies
    Textarea,
    TextareaControlled
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved
import generateSample from './../../../utils/sampling/sampleDataGenerator';

export default generateSample(TextareaControlled, Textarea, { label: 'Textarea-label', maxLength: 20 });
