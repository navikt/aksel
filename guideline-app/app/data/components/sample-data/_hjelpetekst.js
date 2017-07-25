import {
    HjelpetekstOver,
    HjelpetekstUnder,
    HjelpetekstHoyre,
    HjelpetekstVenstre,
    HjelpetekstMidt,
    HjelpetekstAuto
} from './../../../../../packages/node_modules/nav-frontend-hjelpetekst';

import { fillTypesAndModifiersWithCommonValue } from './../../../utils/data/data.utils';

const hjelpetekst = {
    children: 'Slik ser en hjelpetekst ut',
    types: [
        { component: HjelpetekstOver, label: 'Over', _default: true },
        { component: HjelpetekstUnder, label: 'Under' },
        { component: HjelpetekstHoyre, label: 'Høyre' },
        { component: HjelpetekstVenstre, label: 'Venstre' },
        { component: HjelpetekstMidt, label: 'Sentrert' },
        { component: HjelpetekstAuto, label: 'Automatisk' }
    ]
};

const COMMON_VALUE = 'Slik ser en hjelpetekst ut';
hjelpetekst.types = fillTypesAndModifiersWithCommonValue(hjelpetekst.types, COMMON_VALUE);

export default hjelpetekst;
