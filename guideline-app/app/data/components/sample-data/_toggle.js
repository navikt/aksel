import {
    ToggleGruppe,
    ToggleKnapp
} from './../../../../../packages/node_modules/nav-frontend-toggle';

const commonAttrs = { onChange: () => {}, name: 'toggleGruppe' };
const commonChildAttrs = (id, checked) => ({ value: 'knapp' + id, defaultChecked: checked || false });

const allChildren = [
    { component: ToggleKnapp, children: 'Knapp 1', attrs: commonChildAttrs(1, true) },
    { component: ToggleKnapp, children: 'Knapp 2', attrs: commonChildAttrs(2) },
    { component: ToggleKnapp, children: 'Knapp 3', attrs: commonChildAttrs(3) },
    { component: ToggleKnapp, children: 'Knapp 4', attrs: commonChildAttrs(4) },
    { component: ToggleKnapp, children: 'Knapp 5', attrs: commonChildAttrs(5) }
];

const toggle = {
    base: ToggleGruppe,
    types: [
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: allChildren.slice(0, 2),
            label: '2 valg'
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: allChildren.slice(0, 3),
            label: '3 valg',
            _default: true
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: allChildren.slice(0, 4),
            label: '4 valg'
        },
        {
            component: ToggleGruppe,
            attrs: commonAttrs,
            children: allChildren,
            label: '5 valg'
        }
    ]
};

export default toggle;