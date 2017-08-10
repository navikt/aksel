import Chevron, {
    HoyreChevron,
    VenstreChevron,
    OppChevron,
    NedChevron
} from 'NavFrontendModules/nav-frontend-chevron';

const chevron = {
    base: Chevron,
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