import Lukknapp from 'NavFrontendModules/nav-frontend-lukknapp';

import { createSampleData, newType } from './../sampleDataHelper';

const types = [
    newType(Lukknapp, 'Vanlig'),
    newType(Lukknapp, 'Blå', null, null, { bla: true }),
    newType(Lukknapp, 'Hvit', null, null, { hvit: true })
];

export default createSampleData(types);