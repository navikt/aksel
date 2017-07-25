import Spinner from './../../../../../packages/node_modules/nav-frontend-spinner';

const spinner = {
    children: '',
    types: [
        {
            component: Spinner,
            label: 'X Ekstra Liten (xxs)',
            attrs: { storrelse: 'xxs' }
        },
        {
            component: Spinner,
            label: 'Ekstra Liten (xs)',
            attrs: { storrelse: 'xs' }
        },
        {
            component: Spinner,
            label: 'Liten (s)',
            attrs: { storrelse: 's' }
        },
        {
            component: Spinner,
            label: 'Medium',
            _default: true
        },
        {
            component: Spinner,
            label: 'Stor (l)',
            attrs: { storrelse: 'l' }
        },
        {
            component: Spinner,
            label: 'Ekstra Stor (xl)',
            attrs: { storrelse: 'xl' }
        },
        {
            component: Spinner,
            label: 'X Ekstra Stor (xxl)',
            attrs: { storrelse: 'xxl' }
        },
        {
            component: Spinner,
            label: 'XX Ekstra Stor (xxxl)',
            attrs: { storrelse: 'xxxl' }
        }
    ],
    multipleChoiceModifiers: [
        { value: 'stroke', label: 'Stroke' },
        { value: 'negativ', label: 'Negativ', }
    ]
};

export default spinner;