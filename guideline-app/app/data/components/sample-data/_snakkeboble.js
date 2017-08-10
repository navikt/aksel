import React from 'react';
import Snakkeboble from 'NavFrontendModules/nav-frontend-snakkeboble';

const chatText1 = 'Hei! Jeg lurer på en ting...';
const chatText2 = 'Spør i vei.';

const snakkeboble = {
    base: Snakkeboble,
    children: '',
    types: [
        {
            component: Snakkeboble,
            attrs: {
                dato: '14.07.2017 kl. 10:08',
                pilHoyre: false
            },
            children: chatText1,
            label: 'Venstreorientert',
            _default: true
        },
        {
            component: Snakkeboble,
            attrs: {
                dato: '14.07.2017 kl. 10:12',
                pilHoyre: true
            },
            children: chatText2,
            label: 'Høyreorientert',
            _default: true
        }
    ]
};

export default snakkeboble;