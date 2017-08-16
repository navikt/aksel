import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';
import { createSampleData, newType, newSingleChoiceModifier } from './../sampleDataHelper';

const commonChild = 'Slik ser en Alertstripe ut';

const types = [
    newType(AlertStripeSuksess, 'Suksess', [
        newSingleChoiceModifier(AlertStripeSuksessSolid, 'solid')
    ], commonChild),
    newType(AlertStripeInfo, 'Info', [
        newSingleChoiceModifier(AlertStripeInfoSolid, 'solid')
    ], commonChild),
    newType(AlertStripeAdvarsel, 'Advarsel', [], commonChild)
];

export default createSampleData(types, [], AlertStripe);