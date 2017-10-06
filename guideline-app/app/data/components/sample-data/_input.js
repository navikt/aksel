import { // eslint-disable-line import/no-extraneous-dependencies
    Input
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved
import generateSample from './../../../utils/sampling/sampleDataGenerator';

export default generateSample(null, Input, { label: 'Inputfelt-label' });
