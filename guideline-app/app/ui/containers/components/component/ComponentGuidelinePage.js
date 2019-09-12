import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { Innholdstittel, Systemtittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import Modal from 'NavFrontendModules/nav-frontend-modal';
import Knapp from 'NavFrontendModules/nav-frontend-knapper';

import Overview from './tabs/Overview';
import Technical from './tabs/Technical';
import Accessibility from './tabs/Accessibility';
import Discussion from './tabs/Discussion';

import TabbedContainer from './../../tabbed-container/TabbedContainer';

import './styles.less';

class ComponentGuidelinePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.tabs = [
            {
                label: 'Oversikt',
                content: Overview
            },
            {
                id: 'technical',
                label: 'Teknisk',
                content: Technical
            },
            {
                id: 'accessibility',
                label: 'Tilgjengelighet',
                content: Accessibility
            },
            {
                id: 'discussion',
                label: 'Diskusjon',
                content: Discussion
            }
        ];
    }

    toggleModal = (e) => {
        if (e) e.preventDefault();
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        console.log(this.props);

        const beta = (this.props.componentData.manifest.version.indexOf('beta') !== -1);

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    onRequestClose={this.toggleModal}
                    closeButton={false}
                    onAfterOpen={() => ReactDOM.findDOMNode(this.closeModalBtn).focus()}
                >
                    <div id="beta-component-modal">
                        <Systemtittel>Beta betyr uferdig/ustabil</Systemtittel>
                        <p>
                            Beta-komponenter kan inneholde mange bugs, og mangle sentrale funksjoner og
                            dokumentasjon. Det er også fare for at disse komponentene og deres API vil
                            forandre seg mye mellom hver oppdatering.
                        </p><br />
                        <Knapp
                            onClick={this.toggleModal}
                            ref={(node) => { this.closeModalBtn = node; }}
                        >
                            Jeg forstår
                        </Knapp>
                        <br /><br />
                        <div>
                            <Lenke href="https://github.com/navikt/nav-frontend-moduler/issues">
                                Meld fra om feil
                            </Lenke>
                        </div>
                    </div>
                </Modal>
                <div className="componentGuidelinePage">
                    {
                        beta &&
                        <Alertstripe type="advarsel">
                            Dette er en beta-komponent.&nbsp;
                            <Lenke href="#" onClick={this.toggleModal}>Hva betyr det?</Lenke>
                        </Alertstripe>
                    }
                    <div className={classnames('componentTitle', { 'componentTitle--beta': beta })}>
                        <Innholdstittel className={classnames({ beta })}>
                            { this.props.componentData.name }
                        </Innholdstittel>
                    </div>
                    {
                        this.props.textData.ingress &&
                        <Ingress tag="div" className="intro"><this.props.textData.ingress.default /></Ingress>
                    }
                    <TabbedContainer tabs={this.tabs} {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}

export default ComponentGuidelinePage;
