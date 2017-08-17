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
    newType(AlertStripeSuksess, 'Suksess', commonChild, {}, [
        newSingleChoiceModifier(AlertStripeSuksessSolid, 'solid')
    ]),
    newType(AlertStripeInfo, 'Info', commonChild, {}, [
        newSingleChoiceModifier(AlertStripeInfoSolid, 'solid')
    ]),
    newType(AlertStripeAdvarsel, 'Advarsel', commonChild)
];

export default createSampleData(types, [], AlertStripe);