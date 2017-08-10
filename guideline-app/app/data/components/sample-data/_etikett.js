import Etikett, {
    EtikettSuksess,
    EtikettFokus,
    EtikettInfo,
    EtikettAdvarsel
} from 'NavFrontendModules/nav-frontend-etiketter';

import { fillTypesAndModifiersWithCommonValue } from './../../../utils/data/data.utils';

const etikett = {
    base: Etikett,
    types: [
        { component: EtikettSuksess, label: 'Suksess', _default: true },
        { component: EtikettFokus, label: 'Fokus' },
        { component: EtikettInfo, label: 'Info' },
        { component: EtikettAdvarsel, label: 'Advarsel' }
    ]
};

const COMMON_VALUE = 'Slik ser en Etikett ut';
etikett.types = fillTypesAndModifiersWithCommonValue(etikett.types, COMMON_VALUE);

export default etikett;
