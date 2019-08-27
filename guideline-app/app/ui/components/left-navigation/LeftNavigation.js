import React from 'react';
import { NavLink } from 'react-router-dom';

import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { EtikettFokus, EtikettInfo } from 'NavFrontendModules/nav-frontend-etiketter';
import { Systemtittel, Undertittel, Normaltekst, Undertekst } from 'NavFrontendModules/nav-frontend-typografi';

import TitleByRoute from '../title-by-route/TitleByRoute';
import routeConfig from './../../../utils/routing/routes.config';

import './styles.less';

/* <EtikettFokus>Beta</EtikettFokus> */
/* <EtikettInfo>Beta</EtikettInfo> */
/* <span className="dot dot-warn">Beta</span> */

const betaLabel = (item) => {
    if (!item['data']) return;
    if (item.data.manifest.version.indexOf('beta') === -1) return;
    return (<EtikettInfo><Undertekst>Beta</Undertekst></EtikettInfo>);
};

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
                                    { betaLabel(item) }
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
