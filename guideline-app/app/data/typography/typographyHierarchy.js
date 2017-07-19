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
} from 'nav-frontend-typografi';

export const typographyHierarchyData = {
    desktop: [
        { component: Sidetittel, label: 'Sidetittel', subtext: 'Bold - 40/44px (2 rem)' },
        { component: Innholdstittel, label: 'Innholdstittel', subtext: 'Bold - 32/36px (2 rem)' },
        { component: Systemtittel, label: 'Systemtittel', subtext: 'Bold - 24/28px (1.5 rem)' },
        { component: Undertittel, label: 'Undertittel', subtext: 'Bold - 20/25px (1.5 rem)' },
        { component: Ingress, label: 'Ingress', subtext: 'Regular - 20/26px (1.25 rem)' },
        { component: Element, label: 'Element', subtext: 'Bold - 16/22px (1 rem)' },
        { component: Normaltekst, label: 'Normal', subtext: 'Bold - 16/22px (1 rem)' },
        { component: EtikettLiten, label: 'Etikett Liten', subtext: 'Regular - 14/20px (1 rem)' },
        { component: Undertekst, label: 'Undertekst bold', subtext: 'Bold - 14/18px (0.875 rem)' },
        { component: Undertekst, label: 'Undertekst', subtext: 'Bold - 14/20px (0.875 rem)' }
    ],
    mobile: [
        { component: Sidetittel, label: 'Sidetittel', subtext: 'Bold - 30/34px (1.875 rem)' },
        { component: Innholdstittel, label: 'Innholdstittel', subtext: 'Bold - 24/26px (1.5 rem)' },
        { component: Systemtittel, label: 'Systemtittel', subtext: 'Bold - 22/26px (1.375 rem)' },
        { component: Undertittel, label: 'Undertittel', subtext: 'Bold - 20/25px (1.25 rem)' },
        { component: Ingress, label: 'Ingress', subtext: 'Regular - 18/24px (1.125 rem)' },
        { component: Element, label: 'Element', subtext: 'Bold - 16/22px (1 rem)' },
        { component: Normaltekst, label: 'Normal', subtext: 'Regular - 16/22px (1 rem)' },
        { component: EtikettLiten, label: 'Etikett Liten', subtext: 'Regular - 14/20px (1 rem)' },
        { component: Undertekst, label: 'Undertekst bold', subtext: 'Bold - 14/18px (0.875 rem)' },
        { component: Undertekst, label: 'Undertekst', subtext: 'Bold - 14/20px (0.875 rem)' }
    ]
};