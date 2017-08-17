import Hjelpetekst, {
    HjelpetekstOver,
    HjelpetekstUnder,
    HjelpetekstHoyre,
    HjelpetekstVenstre,
    HjelpetekstMidt,
    HjelpetekstAuto
} from 'NavFrontendModules/nav-frontend-hjelpetekst';

import { createSampleData, newType } from './../sampleDataHelper';

const commonChild = 'Slik ser en hjelptekst ut';
const types = [
    newType(HjelpetekstUnder, 'Under', null, commonChild),
    newType(HjelpetekstHoyre, 'Høyre', null, commonChild),
    newType(HjelpetekstVenstre, 'Venstre', null, commonChild),
    newType(HjelpetekstMidt, 'Sentrert', null, commonChild),
    newType(HjelpetekstAuto, 'Automatisk', null, commonChild)
];

export default createSampleData(types, null, Hjelpetekst);
