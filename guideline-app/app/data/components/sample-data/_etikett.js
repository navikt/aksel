import Etikett, {
    EtikettSuksess,
    EtikettFokus,
    EtikettInfo,
    EtikettAdvarsel
} from 'NavFrontendModules/nav-frontend-etiketter';

import { createSampleData, newType } from './../sampleDataHelper';

const commonChild = 'Slik ser en Etikett ut';
const types = [
    newType(EtikettSuksess, 'Suksess', commonChild),
    newType(EtikettFokus, 'Fokus', commonChild),
    newType(EtikettInfo, 'Info', commonChild),
    newType(EtikettAdvarsel, 'Advarsel', commonChild)
];
export default createSampleData(types, null, Etikett);