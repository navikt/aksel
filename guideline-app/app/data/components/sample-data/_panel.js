import React from 'react';
import Ekspanderbartpanel from './../../../../../packages/node_modules/nav-frontend-ekspanderbartpanel';
import Lenkepanel from './../../../../../packages/node_modules/nav-frontend-lenkepanel';

const title = 'Slik ser et panel ut';

const panel = {
    children: '',
    types: [
        {
            component: () => (
                <Ekspanderbartpanel tittel={ title }>Slik ser et åpent panel ut</Ekspanderbartpanel>
            ),
            label: 'Ekspanderbart panel',
            _default: true
        },
        {
            component: () => (
                <Lenkepanel href='#'>Slik ser et lenkepanel ut</Lenkepanel>
            ),
            label: 'Lenkepanel'
        }
    ]
};

export default panel;