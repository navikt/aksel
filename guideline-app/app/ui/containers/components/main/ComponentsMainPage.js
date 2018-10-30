import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import routeConfig from './../../../../utils/routing/routes.config';

import { Innholdstittel, Sidetittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import SubRoutesWrapper from '../../../../utils/routing/subroutesWrapper.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import LeftNavigation from '../../../components/left-navigation/LeftNavigation';
import componentsImg from './../../../../assets/images/components/komponenter.png';

class ComponentMainPage extends React.Component {

    static renderComponentMainContent() {
        return (
            <article className="mainContent">
                Her kommer det et lenke-galleri med små previews av alle komponentene etter hverandre.
            </article>
        );
    }

    renderComponentSubRouteContent() {
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
                    (window.location.hash !== '#/components') ? 
                    this.renderComponentSubRouteContent() : 
                    ComponentMainPage.renderComponentMainContent()
                }
            </React.Fragment>
        );
    }
}

ComponentMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default ComponentMainPage;
