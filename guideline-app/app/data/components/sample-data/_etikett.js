import Etikett, { // eslint-disable-line import/no-extraneous-dependencies
    EtikettSuksess,
    EtikettFokus,
    EtikettInfo,
    EtikettAdvarsel
} from 'NavFrontendModules/nav-frontend-etiketter'; // eslint-disable-line import/extensions, import/no-unresolved

import { createSampleData, newType } from '../../../utils/sampling/sampleDataHelper';

const commonChild = 'Slik ser en Etikett ut';
const types = [
    newType(EtikettSuksess, 'Suksess', commonChild),
    newType(EtikettFokus, 'Fokus', commonChild),
    newType(EtikettInfo, 'Info', commonChild),
    newType(EtikettAdvarsel, 'Advarsel', commonChild)
];
export default createSampleData(types, null, Etikett);
