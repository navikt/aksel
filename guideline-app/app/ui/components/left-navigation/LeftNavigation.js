import React from 'react';

import { ExpandableList } from './../expandable-list/ExpandableList';
import { routeConfig } from './../../../utils/routing/routes.config';

import './styles.less';

export const LeftNavigation = () => {
    return (
        <div className="leftNavigation">
            <img
                className="leftNavigation__logo"
                src="app/assets/images/logo/logo.png"
                alt=""
            />

            <div className="leftNavigation__expandableListWrapper">
                <ExpandableList items={ routeConfig } />
            </div>
        </div>
    )
};