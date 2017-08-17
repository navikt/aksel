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
    newType(HjelpetekstUnder, 'Under', commonChild),
    newType(HjelpetekstHoyre, 'Høyre', commonChild),
    newType(HjelpetekstVenstre, 'Venstre', commonChild),
    newType(HjelpetekstMidt, 'Sentrert', commonChild),
    newType(HjelpetekstAuto, 'Automatisk', commonChild)
];

export default createSampleData(types, null, Hjelpetekst);
