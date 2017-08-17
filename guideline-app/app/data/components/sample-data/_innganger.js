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
    newType(AppInngang, 'Appinngang', null, { tittel: 'Gå til en applikasjon' }),
    newType(DobbelIngressInngang, 'Dobbel-ingress inngang', null, {
        tittel: 'Her er en tittel',
        ingress1: 'Her er ingress 1',
        ingress2: 'Her er ingress 2',
        ikon: 'info-sirkel'
    }),
    newType(EnkelIngressInngang, 'Enkel-ingress inngang', null, {
        tittel: 'Her er en tittel',
        ingress: 'Her er en ingress',
        ikon: 'info-sirkel'
    }),
    newType(NormalVertikalInngang, 'Normal vertikal inngang', null, {
        tittel: 'Her er en tittel',
        tekst: 'Og her har du en tekst',
        lesMerHref: '/#/components/innganger/lenkeeksempel/'
    }),
    newType(StorVertikalInngang, 'Stor vertikal inngang', null, {
        tittel: 'Her er en tittel',
        ingress: 'Og her har du en ingress',
        ikon: 'info-sirkel'
    })
];

export default createSampleData(types);