import {
    HoyreChevron,
    VenstreChevron,
    OppChevron,
    NedChevron
} from './../../../../../packages/node_modules/nav-frontend-chevron';

const chevron = {
    types: [
        { component: HoyreChevron, label: 'Høyre', _default: true },
        { component: VenstreChevron, label: 'Venstre' },
        { component: OppChevron, label: 'Opp' },
        { component: NedChevron, label: 'Ned' }
    ],
    multipleChoiceModifiers: [
        { value: 'stor', label: 'Stor' }
    ]
};

export default chevron;