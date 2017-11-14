import React from 'react';
import PT from 'prop-types';

import { Sidetittel, Ingress } from './../../../../../../packages/node_modules/nav-frontend-typografi';
import SubRoutesWrapper from '../../../../utils/routing/subroutesWrapper.component';
import TitleByRoute from '../../../components/title-by-route/TitleByRoute';
import './styles.less';
import componentsImg from './../../../../assets/images/components/komponenter.png';

class ComponentMainPage extends React.Component {

    static renderComponentMainContent() {
        return (
            <div className="componentMainPage">
                <div className="componentMainPage__content">
                    <img src={componentsImg} alt="Sammspill av kode, CSS, Github og kaffe" />
                    <div className="componentMainPage__content__text">
                        <Sidetittel>Komponenter</Sidetittel>
                        <Ingress>
                            Under styling kan man finne hvordan man bruke farger, ikoner, typografi og tekst til å
                            skape tydelig kommunikasjon og bidra en konsisten NAV identitet som oppstår enhetlig,
                            pålitelig og profesjonell.
                        </Ingress>
                    </div>
                </div>
            </div>
        );
    }

    renderComponentSubRouteContent() {
        return (
            <div className="componentMainPage">
                <TitleByRoute routes={this.props.routes} />
                <SubRoutesWrapper routes={this.props.routes} />
            </div>
        );
    }

    render() {
        if (window.location.hash !== '#/components') {
            return this.renderComponentSubRouteContent();
        }
        return ComponentMainPage.renderComponentMainContent();
    }
}

ComponentMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default ComponentMainPage;
