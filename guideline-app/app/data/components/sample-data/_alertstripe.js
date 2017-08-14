import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';

import { createSampleData, addType, addModifier } from './../sampleDataHelper';

const data =
    createSampleData([
        addType(AlertStripeSuksess, 'Suksess', [
            addModifier(AlertStripeSuksessSolid, 'solid')
        ]),
        addType(AlertStripeInfo, 'Info', [
            addModifier(AlertStripeInfoSolid, 'solid')
        ]),
        addType(AlertStripeAdvarsel, 'Advarsel')
    ], AlertStripe);

console.log(data);

export default data;