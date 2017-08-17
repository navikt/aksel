import Ekspanderbartpanel from 'NavFrontendModules/nav-frontend-ekspanderbartpanel';
import Lenkepanel from 'NavFrontendModules/nav-frontend-lenkepanel';
import { createSampleData, newType } from './../sampleDataHelper';

const types = [
    newType(Ekspanderbartpanel, 'Ekspanderbart panel', 'Slik ser et åpent panel ut', { tittel: 'Slik ser et panel ut '}),
    newType(Lenkepanel, 'Lenkepanel', 'Slik ser et lenkepanel ut', { href: '/# '})
];

export default createSampleData(types);