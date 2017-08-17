import KnappBase,
{
    Knapp,
    Hovedknapp,
    Fareknapp
} from 'NavFrontendModules/nav-frontend-knapper';

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const commonChild = 'Slik ser en knapp ut';
const types = [
    newType(Knapp, 'Sekundærknapp', null, commonChild),
    newType(Hovedknapp, 'Hovedknapp', null, commonChild),
    newType(Fareknapp, 'Fareknapp', null, commonChild)
];
const modifiers = [
    newMultipleChoiceModifier('mini', 'Mini'),
    newMultipleChoiceModifier('spinner', 'Spinner'),
    newMultipleChoiceModifier('disabled', 'Disabled')
];

export default createSampleData(types, modifiers, KnappBase);