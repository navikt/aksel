import Etikett, {
    EtikettSuksess,
    EtikettFokus,
    EtikettInfo,
    EtikettAdvarsel
} from 'NavFrontendModules/nav-frontend-etiketter';

import { createSampleData, newType } from './../sampleDataHelper';

const commonChild = 'Slik ser en Etikett ut';
const types = [
    newType(EtikettSuksess, 'Suksess', null, commonChild),
    newType(EtikettFokus, 'Fokus', null, commonChild),
    newType(EtikettInfo, 'Info', null, commonChild),
    newType(EtikettAdvarsel, 'Advarsel', null, commonChild)
];
export default createSampleData(types, null, Etikett);