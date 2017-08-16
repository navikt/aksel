import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';

import { createSampleData, newType, newModifier } from './../sampleDataHelper';

const commonChild = 'Slik ser en Alertstripe ut';

const types = [
    newType(AlertStripeSuksess, 'Suksess', [
        newModifier(AlertStripeSuksessSolid, 'solid')
    ], commonChild),
    newType(AlertStripeInfo, 'Info', [
        newModifier(AlertStripeInfoSolid, 'solid')
    ], commonChild),
    newType(AlertStripeAdvarsel, 'Advarsel', [], commonChild)
];

const data = createSampleData(types, [], AlertStripe);

console.log(data);

export default data;