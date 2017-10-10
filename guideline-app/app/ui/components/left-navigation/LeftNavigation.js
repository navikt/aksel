import React from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import ExpandableList from './../expandable-list/ExpandableList';
import routeConfig from './../../../utils/routing/routes.config';

import logo from './../../../assets/images/logo/logo.png';

import './styles.less';

const LeftNavigation = () => (
    <div className="leftNavigation">
        <div className="leftNavigation__logoSection">
            <img
                className="leftNavigation__logoSection__logo"
                src={logo}
                alt=""
            />

            <Normaltekst>NAV Designsystem</Normaltekst>
            <hr className="line" />
        </div>

        <div className="leftNavigation__expandableListWrapper">
            <ExpandableList items={routeConfig} />
        </div>
    </div>
);

export default LeftNavigation;
