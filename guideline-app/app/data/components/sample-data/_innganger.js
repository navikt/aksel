import { // eslint-disable-line import/no-extraneous-dependencies
    AppInngang,
    DobbelIngressInngang,
    EnkelIngressInngang,
    NormalVertikalInngang,
    StorVertikalInngang
} from 'NavFrontendModules/nav-frontend-inngang'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType
} from '../../../utils/sampling/sampleDataHelper';

const href = { href: '/#/components/innganger' };

const types = [
    newType(AppInngang, 'Inngang 1', null, {
        tittel: 'Gå til en applikasjon',
        ...href
    }),
    newType(DobbelIngressInngang, 'Inngang 2', null, {
        tittel: 'Her er en tittel',
        ingress1: 'Her er ingress 1',
        ingress2: 'Her er ingress 2',
        ikon: 'info-sirkel',
        ...href
    }),
    newType(EnkelIngressInngang, 'Inngang 3', null, {
        tittel: 'Her er en tittel',
        ingress: 'Her er en ingress',
        ikon: 'info-sirkel',
        ...href
    }),
    newType(NormalVertikalInngang, 'Inngang 4', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        lesMerHref: '/#/components/innganger/lenkeeksempel/',
        ...href
    }),
    newType(NormalVertikalInngang, 'Inngang 5', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        ...href
    }),
    newType(NormalVertikalInngang, 'Inngang 6', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        ikon: 'info-sirkel',
        ...href
    }),
    newType(StorVertikalInngang, 'Inngang 7', null, {
        tittel: 'Her er en tittel',
        ingress: 'Og her har du en ingress',
        ikon: 'info-sirkel',
        ...href
    })
];

export default createSampleData(types);
