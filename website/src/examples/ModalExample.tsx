import React, { useEffect, useState } from "react";
import { Modal } from "@navikt/ds-react";
import ReactModal from "react-modal";
import { Button } from "@navikt/ds-react";

export const ModalExample = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("#hovedinnhold");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h1>Header</h1>
        <h2>subheader</h2>
        <p>
          Cupidatat irure ipsum veniam ad in esse. Voluptate do nulla amet
          laboris ea ex aliquip. Dolore dolore reprehenderit sint esse commodo
          aliqua cupidatat incididunt proident laborum qui.
        </p>
      </Modal>
    </>
  );
};
