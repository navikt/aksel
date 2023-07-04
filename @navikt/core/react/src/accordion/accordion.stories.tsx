import React, { useState } from "react";
import AccordionContent from "./AccordionContent";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import { Accordion, AccordionProps } from ".";
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
      control: { type: "select" },
    },
    size: {
      options: ["large", "medium", "small"],
      control: { type: "select" },
    },
    nItems: {
      control: { type: "number" },
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

const SmallContent = () => (
  <Accordion.Content>
    Magna aliquip aliquip fugiat nostrud <a href="#Lorem">Lorem est</a> pariatur
    veniam officia laboris voluptate officia pariatur.ex anim
  </Accordion.Content>
);

const Item = (props) => {
  const [open, setOpen] = useState(false);

  if (props.defaultOpen) {
    return (
      <Accordion.Item defaultOpen={props.defaultOpen}>
        <Accordion.Header>Accordion header text</Accordion.Header>
        <SmallContent />
      </Accordion.Item>
    );
  }

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
  render: ({ nItems, ...props }) => {
    return (
      <div style={{ width: 500 }}>
        <Accordion {...props}>
          {[...Array(nItems ? nItems : 2)].map((_, y) => (
            <Item key={y} {...props} />
          ))}
        </Accordion>
      </div>
    );
  },

  args: {
    controlled: false,
    nItems: 2,
    variant: "default",
    headingSize: "medium",
    size: "medium",
    indent: true,
  },
};

export const DefaultOpen = {
  render: ({ nItems, openItems, ...props }) => {
    return (
      <div style={{ width: 500 }}>
        <Accordion {...props}>
          {[...Array(nItems ? nItems : 2)].map((_, y) => (
            <Item key={y} defaultOpen={openItems.includes(y)} {...props} />
          ))}
        </Accordion>
      </div>
    );
  },

  args: {
    openItems: [1, 2],
    controlled: false,
    nItems: 5,
    variant: "neutral",
    headingSize: "large",
  },
};

export const Variants = {
  render: () => {
    return (
      <div style={{ width: 500 }} className="colgap">
        <Accordion>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
        <Accordion variant="neutral">
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Controlled = (props) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ width: 500 }}>
      <Accordion {...props}>
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
        <Accordion {...props}>
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
    indent: false,
  },
};

const SingleHeaderAccordion = ({
  size = "medium",
  headingSize = "medium",
}: Partial<AccordionProps>) => {
  return (
    <Accordion size={size} headingSize={headingSize}>
      <Accordion.Item>
        <Accordion.Header>{`${size} size + ${headingSize} heading`}</Accordion.Header>
        <Accordion.Content>a</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>{`${size} size + ${headingSize} heading`}</Accordion.Header>
        <Accordion.Content>a</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

type sizesType = "large" | "medium" | "small";
type headingSizesType = "large" | "medium" | "small" | "xsmall";
const sizes: sizesType[] = ["large", "medium", "small"];
const headingSizes: headingSizesType[] = ["large", "medium", "small", "xsmall"]; // enum this?!

export const Size = {
  render: ({ ...props }) => {
    return (
      <div style={{ width: 500 }} className="colgap">
        {sizes.map((element) => (
          <SingleHeaderAccordion size={element} {...props} />
        ))}
      </div>
    );
  },

  args: {
    variant: "neutral",
  },
};

export const HeadingSize = {
  render: ({ ...props }) => {
    return (
      <div style={{ width: 500 }} className="colgap">
        {headingSizes.map((element) => (
          <SingleHeaderAccordion headingSize={element} {...props} />
        ))}
      </div>
    );
  },

  args: {
    variant: "neutral",
  },
};
