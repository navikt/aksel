import Chevron, { // eslint-disable-line import/no-extraneous-dependencies
    HoyreChevron,
    VenstreChevron,
    OppChevron,
    NedChevron
} from 'NavFrontendModules/nav-frontend-chevron'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const types = [
    newType(HoyreChevron, 'Høyre'),
    newType(VenstreChevron, 'Venstre'),
    newType(OppChevron, 'Opp'),
    newType(NedChevron, 'Ned')
];
const modifiers = [
    newMultipleChoiceModifier('stor', 'Stor')
];

export default createSampleData(types, modifiers, Chevron);
