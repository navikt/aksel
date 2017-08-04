import {
    AppInngang,
    DobbelIngressInngang,
    EnkelIngressInngang,
    NormalVertikalInngang,
    StorVertikalInngang
} from './../../../../../packages/node_modules/nav-frontend-inngang';

const innganger = {
    types: [
        {
            component: AppInngang,
            attrs: {
                tittel: 'Gå til en applikasjon'
            },
            label: 'Appinngang',
            _default: true
        },
        {
            component: DobbelIngressInngang,
            attrs: {
                tittel: 'Her er en tittel',
                ingress1: 'Her er ingress 1',
                ingress2: 'Her er ingress 2',
                ikon: 'info-sirkel'
            },
            label: 'Dobbel-ingress inngang'
        },
        {
            component: EnkelIngressInngang,
            attrs: {
                tittel: 'Her er en tittel',
                ingress: 'Her er en ingress',
                ikon: 'info-sirkel'
            },
            label: 'Enkel-ingress inngang'
        },
        {
            component: NormalVertikalInngang,
            attrs: {
                tittel: 'Her er en tittel',
                tekst: 'Og her har du en tekst'
            },
            label: 'Normal vertikal inngang'
        },
        {
            component: StorVertikalInngang,
            attrs: {
                tittel: 'Her er en tittel',
                ingress: 'Og her har du en ingress',
                ikon: 'info-sirkel'
            },
            label: 'Stor vertikal inngang'
        }

    ]
};

export default innganger;