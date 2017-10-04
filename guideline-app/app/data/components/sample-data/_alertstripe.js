import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';
import pkg from 'NavFrontendModules/nav-frontend-alertstriper/package.json';
import { createSampleData, newType, newSingleChoiceModifier } from './../sampleDataHelper';

//const installDeps = [pkg.name].concat(Object.keys(pkg.peerDependencies || {})).join(' ');
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

