import {
    EtikettSuksess,
    EtikettFokus,
    EtikettInfo,
    EtikettAdvarsel
} from './../../../../../packages/node_modules/nav-frontend-etiketter';

const etikett = {
    children: 'Slik ser en etikett ut',
    types: [
        { component: EtikettSuksess, label: 'Suksess', _default: true },
        { component: EtikettFokus, label: 'Fokus' },
        { component: EtikettInfo, label: 'Info' },
        { component: EtikettAdvarsel, label: 'Advarsel' }
    ]
};

export default etikett;
