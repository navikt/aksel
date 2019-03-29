import React from 'react';
import { NavLink } from 'react-router-dom';

import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { Systemtittel, Undertittel, Normaltekst } from 'NavFrontendModules/nav-frontend-typografi';

import TitleByRoute from '../title-by-route/TitleByRoute';
import routeConfig from './../../../utils/routing/routes.config';

import './styles.less';

const LeftNavigation = (props) => (
    <aside className="leftNavigation">
        <nav>
            <Systemtittel><TitleByRoute routes={routeConfig} /></Systemtittel>
            <ul className="nav-list">
                {
                    props.routes.map((item) =>
                        (
                            <li key={item.title}>
                                <NavLink
                                    activeClassName="active"
                                    to={item.path}
                                >
                                    { item.title }
                                </NavLink>
                            </li>
                        )
                    )
                }
            </ul>
            {
                props.routes[0].path.indexOf('/components') === 0 &&
                <div className="contribute-promo">
                    <Undertittel>Noe du savner?</Undertittel>
                    <LenkepanelBase href="https://github.com/navikt/nav-frontend-moduler" border>
                        <Normaltekst className="lenkepanel__heading">Bidra med nye komponenter på Github</Normaltekst>
                    </LenkepanelBase>
                </div>
            }
        </nav>
    </aside>
);

export default LeftNavigation;
