import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
/* import Modal from "nav-frontend-modal"; */
import dynamic from "next/dynamic";
const DynamicModal = dynamic(() => import("nav-frontend-modal"), {
  ssr: false,
});

const ModalEksempel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Knapp onClick={() => setOpen(true)}>Klikk for å åpne modal</Knapp>
      <DynamicModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        closeButton
        contentLabel="Min modalrute"
      >
        <div style={{ padding: "2rem 2.5rem" }}>Innhold her</div>
      </DynamicModal>
    </div>
  );
};

export default ModalEksempel;
