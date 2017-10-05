import { // eslint-disable-line import/no-extraneous-dependencies
    ToggleGruppe,
    ToggleKnapp
} from 'NavFrontendModules/nav-frontend-toggle';  // eslint-disable-line import/extensions, import/no-unresolved
import { createSampleData, newType } from '../../../utils/sampling/sampleDataHelper';

const commonAttrs = { onChange: () => {}, name: 'toggleGruppe' };
const commonChildAttrs = (id, checked) => ({ value: `knapp${id}`, defaultChecked: checked || false });

const allChildren = [
    { component: ToggleKnapp, children: 'Knapp 1', attrs: commonChildAttrs(1, true) },
    { component: ToggleKnapp, children: 'Knapp 2', attrs: commonChildAttrs(2) },
    { component: ToggleKnapp, children: 'Knapp 3', attrs: commonChildAttrs(3) },
    { component: ToggleKnapp, children: 'Knapp 4', attrs: commonChildAttrs(4) },
    { component: ToggleKnapp, children: 'Knapp 5', attrs: commonChildAttrs(5) }
];

const types = [2, 3, 4, 5].map((numToggles) => (
    newType(ToggleGruppe, `${numToggles} valg`, allChildren.slice(0, numToggles), commonAttrs)
));

export default createSampleData(types);
