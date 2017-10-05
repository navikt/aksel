import { // eslint-disable-line import/no-extraneous-dependencies
    Input
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from '../../../utils/sampling/sampleDataHelper';

const inputSizes = ['fullbredde', 'XXS', 'XS', 'S', 'L', 'XL', 'XXL'];
const types = inputSizes.map((inputSize) => (
    newType(
        Input, inputSize, null, { label: 'Inputfelt-label', bredde: inputSize.toLowerCase() }
    )
));
const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled'),
    newMultipleChoiceModifier({
        feil: {
            feilmelding: 'Her ble det feil gitt'
        }
    }, 'Med feil')
];

export default createSampleData(types, modifiers);
