import React, { Component } from 'react';

import Modal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress, Normaltekst } from 'nav-frontend-typografi';

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
        { component: (props) => (<ModalComp />), label: 'Vanlig', _default: true }
    ]
};

export default modal;
