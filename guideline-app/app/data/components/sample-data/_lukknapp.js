import Lukknapp from './../../../../../packages/node_modules/nav-frontend-lukknapp';

const lukknapp = {
    base: Lukknapp,
    types: [
        {
            component: Lukknapp,
            label: 'Vanlig',
            _default: true
        },
        {
            component: Lukknapp,
            attrs: { bla: true },
            label: 'Blå'
        },
        {
            component: Lukknapp,
            attrs: { hvit: true },
            label: 'Hvit'
        }
    ]
};

export default lukknapp;