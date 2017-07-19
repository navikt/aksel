import React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';

const lukknapp = {
    children: '',
    types: [
        {
            component: Lukknapp,
            label: 'Vanlig',
            _default: true
        },
        {
            component: () => (<Lukknapp bla />),
            label: 'Blå'
        },
        {
            component: () => (<Lukknapp hvit />),
            label: 'Hvit'
        }
    ]
};

export default lukknapp;