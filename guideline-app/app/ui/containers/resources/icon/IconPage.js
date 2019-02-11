import React from 'react';

// import { Innholdstittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';

// import Resources from './tabs/Resources.mdx';
// import Guidelines from './tabs/Guidelines.mdx';
// import Accessibility from './tabs/Accessibility.mdx';
import Icons from './Icons.mdx';

import MdxContent from './../../../components/mdx-content/MdxContent';
// import TabbedContainer from './../../tabbed-container/TabbedContainer';

import './styles.less';

const IconPage = () => (
    <React.Fragment>
        <MdxContent>{Icons}</MdxContent>
    </React.Fragment>
);

export default IconPage;
