import AlertStripe, { // eslint-disable-line import/no-extraneous-dependencies
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper'; // eslint-disable-line import/extensions, import/no-unresolved

//  import pkg from 'NavFrontendModules/nav-frontend-alertstriper/package.json';
//  const installDeps = [pkg.name].concat(Object.keys(pkg.peerDependencies || {})).join(' ');

import { createSampleData, newType, newSingleChoiceModifier } from './../sampleDataHelper';

const commonChild = 'Slik ser en Alertstripe ut';

const types = [
    newType(AlertStripeSuksess, 'Suksess', commonChild, {}, [
        newSingleChoiceModifier(AlertStripeSuksessSolid, 'solid')
    ]),
    newType(AlertStripeInfo, 'Info', commonChild, {}, [
        newSingleChoiceModifier(AlertStripeInfoSolid, 'solid')
    ]),
    newType(AlertStripeAdvarsel, 'Advarsel', commonChild)
];

export default createSampleData(types, [], AlertStripe);

