import React, { useState } from "react";
import AccordionContent from "./AccordionContent";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import { Accordion } from ".";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionContent,
    AccordionHeader,
  },
};

const Content = () => (
  <Accordion.Content>
    Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam officia
    laboris voluptate officia pariatur.Lorem est ex anim velit occaecat nisi qui
    nostrud sit consectetur consectetur officia nostrud ullamco. Est ex duis
    proident nostrud elit qui laborum anim minim eu eiusmod. Veniam in nostrud
    sunt tempor velit incididunt sint ex dolor qui velit id eu. Deserunt magna
    sunt velit in. Est exercitation id cillum qui do. Minim adipisicing nostrud
    commodo proident occaecat aliquip nulla anim proident reprehenderit. Magna
    ipsum officia veniam cupidatat duis veniam dolore reprehenderit mollit
    velit.Ut consequat commodo minim occaecat id pariatur. Nisi enim tempor
    laborum commodo. Tempor sit quis nostrud eu cupidatat sunt commodo
    reprehenderit irure deserunt eiusmod ipsum. Exercitation quis commodo cillum
    eiusmod eiusmod. Do laborum qui proident commodo adipisicing eiusmod id.
  </Accordion.Content>
);

export const Default = (props) => {
  const [open, setOpen] = useState(false);

  const Item = () =>
    props.controlled ? (
      <Accordion.Item
        open={open}
        renderContentWhenClosed={props.renderContentWhenClosed}
      >
        <Accordion.Header onClick={() => setOpen(!open)}>
          Accordion header text
        </Accordion.Header>
        <Content />
      </Accordion.Item>
    ) : (
      <Accordion.Item renderContentWhenClosed={props.renderContentWhenClosed}>
        <Accordion.Header>Accordion header text</Accordion.Header>
        <Content />
      </Accordion.Item>
    );
  return (
    <Accordion>
      {[...Array(props.nItems ? props.nItems : 2)].map((_, y) => (
        <Item key={y} />
      ))}
    </Accordion>
  );
};

Default.args = {
  controlled: false,
  renderContentWhenClosed: false,
  nItems: 2,
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Accordion>
      <Accordion.Item open={open}>
        <Accordion.Header onClick={() => setOpen(!open)}>
          Accordion header text
        </Accordion.Header>
        <Content />
      </Accordion.Item>
      <Accordion.Item open={open2}>
        <Accordion.Header onClick={() => setOpen2(!open2)}>
          Accordion header text
        </Accordion.Header>
        <Content />
      </Accordion.Item>
    </Accordion>
  );
};

export const Uncontrolled = () => (
  <Accordion>
    <Accordion.Item>
      <Accordion.Header>Accordion header text</Accordion.Header>
      <Content />
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>Accordion header text</Accordion.Header>
      <Content />
    </Accordion.Item>
  </Accordion>
);
