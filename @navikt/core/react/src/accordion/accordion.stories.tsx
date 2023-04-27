import React, { useState } from "react";
import AccordionContent from "./AccordionContent";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import { Accordion } from ".";
import { Table } from "..";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionContent,
    AccordionHeader,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          padding: "10rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      options: ["default", "neutral"],
      control: { type: "select" },
    },
    headingSize: {
      options: ["large", "medium", "small", "xsmall"],
      control: { type: "radio" },
    },
  },
};

const Content = () => (
  <Accordion.Content>
    Magna aliquip aliquip fugiat nostrud nostrud velit pariatur veniam officia
    laboris voluptate officia pariatur. <a href="#Lorem">Lorem est</a> ex anim
    velit occaecat nisi qui nostrud sit consectetur consectetur officia nostrud
    ullamco. Est ex duis proident nostrud elit qui laborum anim minim eu
    eiusmod. Veniam in nostrud sunt tempor velit incididunt sint ex dolor qui
    velit id eu. Deserunt magna sunt velit in. Est exercitation id cillum qui
    do. Minim adipisicing nostrud commodo proident occaecat aliquip nulla anim
    proident reprehenderit. Magna ipsum officia veniam cupidatat duis veniam
    dolore reprehenderit mollit velit. Ut consequat commodo minim occaecat id
    pariatur. Nisi enim tempor laborum commodo. Tempor sit quis nostrud eu
    cupidatat sunt commodo reprehenderit irure deserunt eiusmod ipsum.
    Exercitation quis commodo cillum eiusmod eiusmod. Do laborum qui proident
    commodo adipisicing eiusmod id.
  </Accordion.Content>
);

const Item = (props) => {
  const [open, setOpen] = useState(false);

  return props.controlled ? (
    <Accordion.Item open={open}>
      <Accordion.Header onClick={() => setOpen(!open)}>
        Accordion header text
      </Accordion.Header>
      <Content />
    </Accordion.Item>
  ) : (
    <Accordion.Item>
      <Accordion.Header>Accordion header text</Accordion.Header>
      <Content />
    </Accordion.Item>
  );
};

export const Default = {
  render: (props) => {
    return (
      <div style={{ width: 500 }}>
        <Accordion variant={props.variant} headingsize={props.headingSize}>
          {[...Array(props.nItems ? props.nItems : 2)].map((_, y) => (
            <Item key={y} {...props} />
          ))}
        </Accordion>
      </div>
    );
  },

  args: {
    controlled: false,
    nItems: 2,
    variant: "primary",
    headingSize: "large",
  },
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ width: 500 }}>
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
    </div>
  );
};

export const Uncontrolled = () => (
  <div style={{ width: 500 }}>
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
  </div>
);

export const WithTable = {
  render: (props) => {
    const ExampleTable = () => {
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Fornavn</Table.HeaderCell>
              <Table.HeaderCell>Etternavn</Table.HeaderCell>
              <Table.HeaderCell>Rolle</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>1</Table.HeaderCell>
              <Table.DataCell>Jean-Luc</Table.DataCell>
              <Table.DataCell>Picard</Table.DataCell>
              <Table.DataCell>Kaptein</Table.DataCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>2</Table.HeaderCell>
              <Table.DataCell>William</Table.DataCell>
              <Table.DataCell>Riker</Table.DataCell>
              <Table.DataCell>Kommandør</Table.DataCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>3</Table.HeaderCell>
              <Table.DataCell>Geordi</Table.DataCell>
              <Table.DataCell>La Forge</Table.DataCell>
              <Table.DataCell>Sjefsingeniør</Table.DataCell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    };

    const ContentWithTable = () => {
      return (
        <Accordion.Content>
          <ExampleTable />
        </Accordion.Content>
      );
    };

    return (
      <div style={{ width: 500 }}>
        <Accordion variant={props.variant} headingsize={props.headingSize}>
          <Accordion.Item>
            <Accordion.Header>Table of people</Accordion.Header>
            <ContentWithTable />
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Table of people</Accordion.Header>
            <ContentWithTable />
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },

  args: {
    variant: "default",
    headingSize: "large",
  },
};
