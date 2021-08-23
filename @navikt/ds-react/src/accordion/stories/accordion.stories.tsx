import React, { useState } from "react";
import { Accordion } from "../index";

export default {
  title: "ds-react/accordion",
  component: Accordion,
};

export const All = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Accordion</h1>
      <Accordion open={open}>
        <Accordion.Header onClick={(e) => setOpen(!open)}>
          Accordion header text
        </Accordion.Header>
        <Accordion.Content>
          Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
          officia laboris voluptate officia pariatur.
        </Accordion.Content>
      </Accordion>
    </>
  );
};
