import { // eslint-disable-line import/no-extraneous-dependencies
    ToggleGruppe,
    ToggleKnapp
} from 'NavFrontendModules/nav-frontend-toggle';  // eslint-disable-line import/extensions, import/no-unresolved
import generateSample from './../../../utils/sampling/sampleDataGenerator';

const commonChildAttrs = (id, checked) => ({ value: `knapp${id}`, defaultChecked: checked || false });
const allChildren = [
    { component: ToggleKnapp, children: 'Knapp 1', attrs: commonChildAttrs(1, true) },
    { component: ToggleKnapp, children: 'Knapp 2', attrs: commonChildAttrs(2) },
    { component: ToggleKnapp, children: 'Knapp 3', attrs: commonChildAttrs(3) }
];

export default generateSample(ToggleGruppe, [], { onChange: () => {}, name: 'toggleGruppe' }, allChildren);
