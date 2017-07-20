import React from 'react';
import Snakkeboble from './../../../../../packages/node_modules/nav-frontend-snakkeboble';

const chatText1 = 'Hei! Jeg lurer på en ting...';
const chatText2 = 'Spør i vei.';

const snakkeboble = {
    children: '',
    types: [
        {
            component: () => <Snakkeboble dato="14.07.2017 kl. 10:08">{chatText1}</Snakkeboble>,
            label: 'Venstreorientert',
            _default: true
        },
        {
            component: () => <Snakkeboble dato="14.07.2017 kl. 10:12" pilHoyre>{chatText2}</Snakkeboble>,
            label: 'Høyreorientert',
            _default: true
        }
    ]
};

export default snakkeboble;