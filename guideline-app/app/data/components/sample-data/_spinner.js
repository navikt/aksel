import { createSampleData, newType, newMultipleChoiceModifier } from './../sampleDataHelper';
import Spinner from 'NavFrontendModules/nav-frontend-spinner';

const spinnerSizes = [ 'M', 'XXS', 'XS', 'S', 'L', 'XL', 'XXL', 'XXXL' ];
const types = spinnerSizes.map((spinnerSize) => (
    newType(Spinner, spinnerSize, null, { storrelse: spinnerSize.toLowerCase() })
));
const modifiers = [
    newMultipleChoiceModifier('stroke', 'Stroke'),
    newMultipleChoiceModifier('negativ', 'Negativ')
];

export default createSampleData(types, modifiers);
