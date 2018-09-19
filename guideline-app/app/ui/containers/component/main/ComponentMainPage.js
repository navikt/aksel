import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import routeConfig from './../../../../utils/routing/routes.config';

import { Sidetittel, Ingress } from './../../../../../../packages/node_modules/nav-frontend-typografi';
import SubRoutesWrapper from '../../../../utils/routing/subroutesWrapper.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import LeftNavigation from '../../../components/left-navigation/LeftNavigation';
import componentsImg from './../../../../assets/images/components/komponenter.png';

import './styles.less';

class ComponentMainPage extends React.Component {

    static renderComponentMainContent() {
        return (
            <article>
                Komponenter
            </article>
        );
    }

    renderComponentSubRouteContent() {
        return (
            <article className="componentMainPage">
                <TitleByRoute routes={this.props.routes} />
                <SubRoutesWrapper routes={this.props.routes} />
            </article>
        );
    }

    render() {

        return (
            <React.Fragment>
                <LeftNavigation />
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
