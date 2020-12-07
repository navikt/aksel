import React, { useState } from "react";
import Modal from "../src/index";

export default {
  title: "@nav-frontend/react-modal",
  component: Modal,
};

export const All = () => {
  const [open, setOpen] = useState(true);

  const closeRequest = () => {
    setOpen(!open);
  };
  return (
    <>
      <h1>Alert</h1>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onRequestClose={closeRequest}>
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
