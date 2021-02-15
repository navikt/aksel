import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button, Accordion } from "@navikt/ds-react";

export const AccordionExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>Open modal</Button>
      <Accordion heading="tittel" open={open}>
        Eu magna fugiat officia sit ullamco reprehenderit reprehenderit officia.
        Culpa fugiat irure deserunt irure enim adipisicing qui id.
      </Accordion>
    </>
  );
};
