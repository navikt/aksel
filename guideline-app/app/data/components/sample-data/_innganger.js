import {
    AppInngang,
    DobbelIngressInngang,
    EnkelIngressInngang,
    NormalVertikalInngang,
    StorVertikalInngang
} from 'NavFrontendModules/nav-frontend-inngang';

import {
    createSampleData,
    newType
} from './../sampleDataHelper';

const types = [
    newType(AppInngang, 'Inngang 1', null, { tittel: 'Gå til en applikasjon' }),
    newType(DobbelIngressInngang, 'Inngang 2', null, {
        tittel: 'Her er en tittel',
        ingress1: 'Her er ingress 1',
        ingress2: 'Her er ingress 2',
        ikon: 'info-sirkel'
    }),
    newType(EnkelIngressInngang, 'Inngang 3', null, {
        tittel: 'Her er en tittel',
        ingress: 'Her er en ingress',
        ikon: 'info-sirkel'
    }),
    newType(NormalVertikalInngang, 'Inngang 4', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        lesMerHref: '/#/components/innganger/lenkeeksempel/'
    }),
    newType(NormalVertikalInngang, 'Inngang 5', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst'
    }),
    newType(NormalVertikalInngang, 'Inngang 6', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        ikon: 'info-sirkel'
    }),
    newType(StorVertikalInngang, 'Inngang 7', null, {
        tittel: 'Her er en tittel',
        ingress: 'Og her har du en ingress',
        ikon: 'info-sirkel'
    })
];

export default createSampleData(types);