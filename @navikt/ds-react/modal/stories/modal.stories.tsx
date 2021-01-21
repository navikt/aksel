import React, { useState } from "react";
import Modal from "../src/index";
import ReactModal from "react-modal";

export default {
  title: "@navikt/modal",
  component: Modal,
};

ReactModal.setAppElement("#root");

export const All = () => {
  const [open, setOpen] = useState(true);
  const [openTwo, setOpenTwo] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h1>Header</h1>
        <h2>subheader</h2>
        <p>
          Cupidatat irure ipsum veniam ad in esse. Voluptate do nulla amet
          laboris ea ex aliquip. Dolore dolore reprehenderit sint esse commodo
          aliqua cupidatat incididunt proident laborum qui. Officia fugiat non
          anim cupidatat. Adipisicing ut aliqua cillum nulla elit. Mollit et id
          duis cupidatat labore magna consectetur et veniam tempor. In minim
          exercitation id irure velit sit dolor aliquip velit esse. Excepteur
          sint non minim nulla excepteur labore non magna eu.
        </p>
      </Modal>

      <button onClick={() => setOpenTwo(true)}>
        Open modal,shouldCloseOnOverlayClick false{" "}
      </button>
      <Modal
        shouldCloseOnOverlayClick={false}
        open={openTwo}
        onClose={() => setOpenTwo(false)}
      >
        <h1>Header</h1>
        <h2>subheader</h2>
        <p>
          Cupidatat irure ipsum veniam ad in esse. Voluptate do nulla amet
          laboris ea ex aliquip. Dolore dolore reprehenderit sint esse commodo
          aliqua cupidatat incididunt proident laborum qui. Officia fugiat non
          anim cupidatat. Adipisicing ut aliqua cillum nulla elit. Mollit et id
          duis cupidatat labore magna consectetur et veniam tempor. In minim
          exercitation id irure velit sit dolor aliquip velit esse. Excepteur
          sint non minim nulla excepteur labore non magna eu.
        </p>
      </Modal>
    </>
  );
};
