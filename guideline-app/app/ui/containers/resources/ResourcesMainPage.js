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
                    <CatalogItem to="/resources/colors">
                        <Undertittel className="lenkepanel__heading">Farger</Undertittel>
                    </CatalogItem>
                    <CatalogItem to="/resources/colors">
                        <Undertittel className="lenkepanel__heading">Illustrasjoner</Undertittel>
                    </CatalogItem>
                    <CatalogItem to="/resources/colors">
                        <Undertittel className="lenkepanel__heading">Ikoner</Undertittel>
                    </CatalogItem>
                    <CatalogItem to="/resources/colors">
                        <Undertittel className="lenkepanel__heading">Tilgjengelighet</Undertittel>
                    </CatalogItem>
                    <CatalogItem to="/resources/colors">
                        <Undertittel className="lenkepanel__heading">Slik skriver vi</Undertittel>
                    </CatalogItem>
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
