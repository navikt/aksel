import React, { Component } from 'react';
import PT from 'prop-types';
import { Sidetittel, Ingress } from './../../../../../packages/node_modules/nav-frontend-typografi';
import stylingImg from './../../../assets/images/styling/styling.png';
import SubRoutesWrapper from '../../../utils/routing/subroutesWrapper.component';
import './styles.less';

export default class StyleMainPage extends Component {

    static renderStyleMainContent() {
        return (
            <div className="styleMainPage">
                <div className="styleMainPage__content">
                    <img src={stylingImg} alt="Samspill av fonter, farger og designprogrammvare" />
                    <div className="styleMainPage__content__text">
                        <Sidetittel>Styling</Sidetittel>
                        <Ingress>
                            Under styling kan man finne hvordan man bruke farger, ikoner, typografi og tekst til å skape
                            tydelig kommunikasjon og bidra en konsisten NAV identitet som oppstår enhetlig, pålitelig og
                            profesjonell.
                        </Ingress>
                    </div>
                </div>
            </div>
        );
    }

    renderStyleSubrouteContent() {
        return (
            <div className="styleMainPage">
                <SubRoutesWrapper routes={this.props.routes} />
            </div>
        );
    }


    render() {
        if (window.location.hash !== '#/styling') {
            return this.renderStyleSubrouteContent();
        }
        return StyleMainPage.renderStyleMainContent();
    }
}

StyleMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};
