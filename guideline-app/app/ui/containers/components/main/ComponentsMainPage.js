import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import routeConfig from './../../../../utils/routing/routes.config';

import { Innholdstittel, Sidetittel, Systemtittel, Undertittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { Knapp } from 'NavFrontendModules/nav-frontend-knapper';
import SubRoutesWrapper from '../../../../utils/routing/subroutesWrapper.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';

import LeftNavigation from '../../../components/left-navigation/LeftNavigation';

class ComponentMainPage extends React.Component {

    renderComponentMainContent = () => {
        return (
            <article className="mainContent mainContent--grey">
                <div className="catalog">
                    {
                        this.props.routes.map((route, index) => (
                            <LenkepanelBase
                                key={index}
                                linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                                href={route.path}
                            >
                                <Undertittel className="lenkepanel__heading">{route.title}</Undertittel>
                            </LenkepanelBase>
                        ))
                    }
                </div>
            </article>
        );
    }

    renderComponentSubRouteContent = () => {
        return (
            <article className="mainContent">
                <Innholdstittel>
                    <TitleByRoute routes={this.props.routes} />
                </Innholdstittel>
                <SubRoutesWrapper routes={this.props.routes} />
            </article>
        );
    }

    render() {
        return (
            <React.Fragment>
                <LeftNavigation routes={this.props.routes} />
                {
                    (this.props.history.location.pathname !== '/components') ? 
                    this.renderComponentSubRouteContent() :
                    this.renderComponentMainContent()
                }
            </React.Fragment>
        );
    }
}

export default withRouter(ComponentMainPage);
