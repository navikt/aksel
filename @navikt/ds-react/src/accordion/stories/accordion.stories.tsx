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
          officia laboris voluptate officia pariatur.Lorem est ex anim velit
          occaecat nisi qui nostrud sit consectetur consectetur officia nostrud
          ullamco. Est ex duis proident nostrud elit qui laborum anim minim eu
          eiusmod. Veniam in nostrud sunt tempor velit incididunt sint ex dolor
          qui velit id eu. Deserunt magna sunt velit in. Est exercitation id
          cillum qui do. Minim adipisicing nostrud commodo proident occaecat
          aliquip nulla anim proident reprehenderit. Magna ipsum officia veniam
          cupidatat duis veniam dolore reprehenderit mollit velit.Ut consequat
          commodo minim occaecat id pariatur. Nisi enim tempor laborum commodo.
          Tempor sit quis nostrud eu cupidatat sunt commodo reprehenderit irure
          deserunt eiusmod ipsum. Exercitation quis commodo cillum eiusmod
          eiusmod. Do laborum qui proident commodo adipisicing eiusmod id.
        </Accordion.Content>
      </Accordion>
      <Accordion open={open}>
        <Accordion.Header onClick={(e) => setOpen(!open)}>
          Accordion header text
        </Accordion.Header>
        <Accordion.Content>
          Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam
          officia laboris voluptate officia pariatur.Lorem est ex anim velit
          occaecat nisi qui nostrud sit consectetur consectetur officia nostrud
          ullamco. Est ex duis proident nostrud elit qui laborum anim minim eu
          eiusmod. Veniam in nostrud sunt tempor velit incididunt sint ex dolor
          qui velit id eu. Deserunt magna sunt velit in. Est exercitation id
          cillum qui do. Minim adipisicing nostrud commodo proident occaecat
          aliquip nulla anim proident reprehenderit. Magna ipsum officia veniam
          cupidatat duis veniam dolore reprehenderit mollit velit.Ut consequat
          commodo minim occaecat id pariatur. Nisi enim tempor laborum commodo.
          Tempor sit quis nostrud eu cupidatat sunt commodo reprehenderit irure
          deserunt eiusmod ipsum. Exercitation quis commodo cillum eiusmod
          eiusmod. Do laborum qui proident commodo adipisicing eiusmod id.
        </Accordion.Content>
      </Accordion>
    </>
  );
};
