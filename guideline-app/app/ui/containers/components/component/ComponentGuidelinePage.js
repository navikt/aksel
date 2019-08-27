import React from 'react';
import classnames from 'classnames';

import { Innholdstittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import { EtikettFokus } from 'NavFrontendModules/nav-frontend-etiketter';
import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import Modal from 'NavFrontendModules/nav-frontend-modal';

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
                    closeButton={true}
                    contentLabel="Min modalrute"
                >
                    <div style={{padding:'2rem 2.5rem'}}>Innhold her</div>
                </Modal>
                <div className="componentGuidelinePage">
                    { 
                        beta &&
                        <Alertstripe type="advarsel">
                            Dette er en beta-komponent. <Lenke href="#" onClick={this.toggleModal}>Hva betyr det?</Lenke>
                        </Alertstripe>
                    }
                    <div className={classnames('componentTitle', { 'componentTitle--beta': beta })}>
                        <Innholdstittel className={classnames({'beta': beta})}>
                            {this.props.componentData.name}
                        </Innholdstittel>
                    </div>
                    {
                        this.props.textData.ingress &&
                        <Ingress tag="div" className="intro"><this.props.textData.ingress.default /></Ingress>
                    }
                    {/*<EtikettFokus>Beta</EtikettFokus>*/}
                    <TabbedContainer tabs={this.tabs} {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}

export default ComponentGuidelinePage;
