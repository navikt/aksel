import React from 'react';
import classnames from 'classnames';
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

const isBeta = (item) => {
    if (!item.data) return false;
    if (item.data.manifest.version.indexOf('beta') === -1) return false;
    return true;
};

const isStyle = (item) => {
    if (!item.data) return false;
    if (item.data.manifest.name.indexOf('-style') === -1) return false;
    return true;
};

const LeftNavigation = (props) => (
    <aside className="leftNavigation">
        <nav>
            <Systemtittel><TitleByRoute routes={routeConfig} /></Systemtittel>
            <ul className="nav-list">
                {
                    props.routes && props.routes.map((item) =>
                        (
                            <li
                                key={item.title}
                                className={classnames({ divider: item.path === '/components/other' })}
                            >
                                <NavLink
                                    activeClassName="active"
                                    to={item.path}
                                >
                                    { item.title }
                                    {
                                        isBeta(item) &&
                                        <EtikettFokus><Undertekst>Beta</Undertekst></EtikettFokus>
                                    }
                                    {
                                        isStyle(item) &&
                                        <EtikettInfo><Undertekst>CSS</Undertekst></EtikettInfo>
                                    }
                                </NavLink>
                            </li>
                        )
                    )
                }
            </ul>
            {
                props.routes && props.routes[0].path.indexOf('/components') === 0 &&
                <React.Fragment>
                    <div className="contribute-promo">
                        <Undertittel>Noe du savner?</Undertittel>
                        <LenkepanelBase href="https://github.com/navikt/nav-frontend-moduler" border>
                            <Normaltekst className="lenkepanel__heading">
                                Bidra med nye komponenter på Github
                            </Normaltekst>
                        </LenkepanelBase>
                    </div>
                </React.Fragment>
            }
        </nav>
    </aside>
);

export default LeftNavigation;
