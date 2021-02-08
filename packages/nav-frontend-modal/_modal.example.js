import React, { Component } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Knapp } from "nav-frontend-knapper";
// eslint-disable-next-line
import Modal from "./";

export default class ModalEksempel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Knapp onClick={() => this.openModal()}>Klikk for å åpne modal</Knapp>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          closeButton
          contentLabel="Min modalrute"
        >
          <div style={{ padding: "2rem 2.5rem" }}>Innhold her</div>
        </Modal>
      </div>
    );
  }
}
