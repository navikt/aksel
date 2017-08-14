import AlertStripe, {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from 'NavFrontendModules/nav-frontend-alertstriper';

import { fillTypesAndModifiersWithCommonValue } from './../../../utils/data/data.utils';
import { createSampleData, addType, addModifier } from './../sampleDataHelper';
const alertstripe = {
    base: AlertStripe,
    types: [
        {
            component: AlertStripeSuksess,
            label: 'Suksess',
            _default: true,
            modifiers: [
                { value: 'normal', component: AlertStripeSuksess },
                { value: 'solid', component: AlertStripeSuksessSolid }
            ]
        },
        {
            component: AlertStripeInfo,
            label: 'Info',
            modifiers: [
                { value: 'normal', component: AlertStripeInfo },
                { value: 'solid', component: AlertStripeInfoSolid }
            ]
        },
        {
            component: AlertStripeAdvarsel,
            label: 'Advarsel'
        }
    ],
    modifiers: [
        { value: 'normal', label: 'Normal',  _default: true },
        { value: 'solid', label: 'Solid' }
    ]
};


const test =
    createSampleData([
        addType(AlertStripeSuksess, 'Suksess', [
            addModifier(AlertStripeSuksessSolid, 'solid')
        ]),
        addType(AlertStripeInfo, 'Info', [
            addModifier(AlertStripeInfoSolid, 'solid')
        ]),
        addType(AlertStripeAdvarsel, 'Advarsel')
    ], AlertStripe);

console.log(test);


const COMMON_VALUE = 'Slik ser en Alertstripe ut';
alertstripe.types = fillTypesAndModifiersWithCommonValue(alertstripe.types, COMMON_VALUE);

export default alertstripe;