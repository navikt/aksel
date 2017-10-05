import Spinner from 'NavFrontendModules/nav-frontend-spinner'; // eslint-disable-line import/no-extraneous-dependencies, import/extensions, import/no-unresolved
import { createSampleData, newType, newMultipleChoiceModifier } from '../../../utils/sampling/sampleDataHelper';

const spinnerSizes = ['M', 'XXS', 'XS', 'S', 'L', 'XL', 'XXL', 'XXXL'];
const types = spinnerSizes.map((spinnerSize) => (
    newType(Spinner, spinnerSize, null, { storrelse: spinnerSize.toLowerCase() })
));
const modifiers = [
    newMultipleChoiceModifier('stroke', 'Stroke'),
    newMultipleChoiceModifier('negativ', 'Negativ')
];

export default createSampleData(types, modifiers);
