import React, { Component } from 'react';

import Modal from 'NavFrontendModules/nav-frontend-modal';
import { Knapp } from 'NavFrontendModules/nav-frontend-knapper';
import { Innholdstittel, Ingress, Normaltekst } from 'NavFrontendModules/nav-frontend-typografi';

export class ModalComp extends Component {
    componentWillMount() {
        this.state = {
            modalIsOpen: false
        };
    }

    openModal () {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        return (
            <div>
                <Knapp onClick={ () => this.openModal() }>Klikk for å åpne modal</Knapp>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ () => this.closeModal() }
                    closeButton={ false }
                    contentLabel="Heisann.">
                    <Innholdstittel>Tittel i modalen</Innholdstittel>
                    <Ingress>Ingress i modalen</Ingress>
                    <Normaltekst>Normaltekst i modalen</Normaltekst>
                </Modal>
            </div>
        );
    }
};

const modal = {
    types: [
        { component: ModalComp, label: 'Vanlig', _default: true }
    ]
};

export default modal;
