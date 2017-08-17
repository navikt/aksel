import {
    Input
} from 'NavFrontendModules/nav-frontend-skjema';

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const inputSizes = ['fullbredde', 'XXS', 'XS', 'S', 'L', 'XL', 'XXL'];
const types = inputSizes.map((inputSize) => (
    newType(
        Input, inputSize, null, null,  { label: 'Inputfelt-label', bredde: inputSize.toLowerCase() }
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