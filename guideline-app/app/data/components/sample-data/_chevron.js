import Chevron, {
    HoyreChevron,
    VenstreChevron,
    OppChevron,
    NedChevron
} from 'NavFrontendModules/nav-frontend-chevron';

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