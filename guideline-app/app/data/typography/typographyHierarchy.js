import {
    Sidetittel,
    Normaltekst,
    Undertittel,
    Innholdstittel,
    Systemtittel,
    Ingress,
    Element,
    EtikettLiten,
    Undertekst
} from './../../../../packages/node_modules/nav-frontend-typografi';

const typographyHierarchyData = [
    {
        component: Sidetittel,
        label: 'Sidetittel',
        desktopText: 'Bold - 40/44px (2 rem)',
        mobileText: 'Bold - 30/34px (1.875 rem)'
    },
    {
        component: Innholdstittel,
        label: 'Innholdstittel',
        desktopText: 'Bold - 32/36px (2 rem)',
        mobileText: 'Bold - 24/26px (1.5 rem)'
    },
    {
        component: Systemtittel,
        label: 'Systemtittel',
        desktopText: 'Bold - 24/28px (1.5 rem)',
        mobileText: 'Bold - 22/26px (1.375 rem)'
    },
    {
        component: Undertittel,
        label: 'Undertittel',
        desktopText: 'Bold - 20/25px (1.5 rem)',
        mobileText: 'Bold - 20/25px (1.25 rem)'
    },
    {
        component: Ingress,
        label: 'Ingress',
        desktopText: 'Regular - 20/26px (1.25 rem)',
        mobileText: 'Regular - 18/24px (1.125 rem)'
    },
    {
        component: Element,
        label: 'Element',
        desktopText: 'Bold - 16/22px (1 rem)',
        mobileText: 'Bold - 16/22px (1 rem)'
    },
    {
        component: Normaltekst,
        label: 'Normal',
        desktopText: 'Bold - 16/22px (1 rem)',
        mobileText: 'Regular - 16/22px (1 rem)'
    },
    {
        component: EtikettLiten,
        label: 'Etikett Liten',
        desktopText: 'Regular - 14/20px (1 rem)',
        mobileText: 'Regular - 14/20px (1 rem)'
    },
    {
        component: Undertekst,
        label: 'Undertekst bold',
        desktopText: 'Bold - 14/18px (0.875 rem)',
        mobileText: 'Bold - 14/18px (0.875 rem)'
    },
    {
        component: Undertekst,
        label: 'Undertekst',
        desktopText: 'Bold - 14/20px (0.875 rem)',
        mobileText: 'Bold - 14/20px (0.875 rem)'
    }
];

export default typographyHierarchyData;
