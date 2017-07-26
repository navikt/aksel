import React from 'react';

import {
    ToggleGruppe,
    ToggleKnapp
} from './../../../../../packages/node_modules/nav-frontend-toggle';

const commonChildren = () => (
    <ToggleKnapp key="0" value="knapp" defaultChecked={ true }>Knapp</ToggleKnapp>
);

const commonAttrs = { onChange: () => {}, name: 'toggleGruppe' };
const commonChildAttrs = { key: 0, value: 'knapp', defaultChecked: true, children: 'Knapp' };

const toggle = {
    types: [
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: {
                component: ToggleKnapp,
                attrs: commonChildAttrs
            },
            label: '2 valg'
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: {
                component: ToggleKnapp,
                attrs: commonChildAttrs
            },
            label: '3 valg',
            _default: true
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: {
                component: ToggleKnapp,
                attrs: commonChildAttrs
            },
            label: '4 valg'
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: {
                component: ToggleKnapp,
                attrs: commonChildAttrs
            },
            label: '5 valg'
        }
    ]
};

export default toggle;