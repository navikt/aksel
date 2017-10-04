import React from 'react';

import TitleByRoute from './../../components/title-by-route/TitleByRoute';
import routeConfig from './../../../utils/routing/routes.config';

import './styles.less';

const Header = () => (
    <div className="header">
        <div style={{ width: '120px' }} />
        <div className="header__content">
            <div className="header__content__textSection">
                <h1 className="smallHeader">
                    Designsystemet
                </h1>

                <TitleByRoute routes={routeConfig} noHr />
            </div>
        </div>
    </div>
);

export default Header;
