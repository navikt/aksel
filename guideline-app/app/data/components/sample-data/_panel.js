import Ekspanderbartpanel from 'NavFrontendModules/nav-frontend-ekspanderbartpanel'; // eslint-disable-line import/extensions, import/no-unresolved, import/no-extraneous-dependencies
import Lenkepanel from 'NavFrontendModules/nav-frontend-lenkepanel'; // eslint-disable-line import/extensions, import/no-unresolved, import/no-extraneous-dependencies
import { createSampleData, newType } from '../../../utils/sampling/sampleDataHelper';

const types = [
    newType(
        Ekspanderbartpanel,
        'Ekspanderbart panel',
        'Slik ser et åpent panel ut',
        { tittel: 'Slik ser et panel ut ' }
    ),
    newType(
        Lenkepanel,
        'Lenkepanel',
        'Slik ser et lenkepanel ut',
        { href: '/# ' }
    )
];

export default createSampleData(types);
