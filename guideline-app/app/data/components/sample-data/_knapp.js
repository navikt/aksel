import KnappBase, // eslint-disable-line import/no-extraneous-dependencies
{
    Knapp,
    Hovedknapp,
    Fareknapp
} from 'NavFrontendModules/nav-frontend-knapper'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const commonChild = 'Slik ser en knapp ut';
const types = [
    newType(Knapp, 'Sekundærknapp', commonChild),
    newType(Hovedknapp, 'Hovedknapp', commonChild),
    newType(Fareknapp, 'Fareknapp', commonChild)
];
const modifiers = [
    newMultipleChoiceModifier('mini', 'Mini'),
    newMultipleChoiceModifier('spinner', 'Spinner'),
    newMultipleChoiceModifier('disabled', 'Disabled')
];

export default createSampleData(types, modifiers, KnappBase);
