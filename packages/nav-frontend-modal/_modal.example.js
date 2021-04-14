import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import Modal from "nav-frontend-modal";

const ModalEksempel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Knapp onClick={() => setOpen(true)}>Klikk for å åpne modal</Knapp>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        closeButton
        contentLabel="Min modalrute"
      >
        <div style={{ padding: "2rem 2.5rem" }}>Innhold her</div>
      </Modal>
    </div>
  );
};

export default ModalEksempel;
