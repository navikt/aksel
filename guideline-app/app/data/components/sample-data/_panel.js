import Ekspanderbartpanel from './../../../../../packages/node_modules/nav-frontend-ekspanderbartpanel';
import Lenkepanel from './../../../../../packages/node_modules/nav-frontend-lenkepanel';

const panel = {
    types: [
        {
            component: Ekspanderbartpanel,
            attrs: { tittel: 'Slik ser et panel ut' },
            children: 'Slik ser et åpent panel ut',
            label: 'Ekspanderbart panel',
            _default: true
        },
        {
            component: Lenkepanel,
            attrs: { href: '/#' },
            children: 'Slik ser et lenkepanel ut',
            label: 'Lenkepanel'
        }
    ]
};

export default panel;