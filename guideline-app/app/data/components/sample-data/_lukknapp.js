import Lukknapp from 'NavFrontendModules/nav-frontend-lukknapp'; // eslint-disable-line import/extensions, import/no-unresolved, import/no-extraneous-dependencies

import { createSampleData, newType } from '../../../utils/sampling/sampleDataHelper';

const types = [
    newType(Lukknapp, 'Vanlig'),
    newType(Lukknapp, 'Blå', null, { bla: true }),
    newType(Lukknapp, 'Hvit', null, { hvit: true })
];

export default createSampleData(types);
