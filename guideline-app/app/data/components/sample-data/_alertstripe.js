import {
    AlertStripeSuksess,
    AlertStripeSuksessSolid,
    AlertStripeInfo,
    AlertStripeInfoSolid,
    AlertStripeAdvarsel
} from './../../../../../packages/node_modules/nav-frontend-alertstriper';

const alertstripe = {
    children: 'Slik ser en Alertstripe ut',
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

export default alertstripe;