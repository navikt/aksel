import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { Undertittel } from 'NavFrontendModules/nav-frontend-typografi';

import SubRoutesWrapper from '../../../utils/routing/subroutesWrapper.component';
import LeftNavigation from '../../components/left-navigation/LeftNavigation';

// import './styles.less';

const CatalogItem = (props) => (
    <LenkepanelBase
        linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
        href={props.to}
        children={props.children}
    />
);

class ResoucesMainPage extends React.Component {
    renderMainContent = () => {
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

    renderSubRoute = () => {
        return (
            <article className="mainContent">
                <SubRoutesWrapper routes={this.props.routes} />
            </article>
        );
    }

    render(){
        return (
            <React.Fragment>
                <LeftNavigation routes={this.props.routes} />
                {
                    (this.props.history.location.pathname !== '/resources') ? 
                    this.renderSubRoute() : 
                    this.renderMainContent()
                }
            </React.Fragment>
        );
    }
}

export default withRouter(ResoucesMainPage);
