import { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Accordion, AccordionProps } from ".";
import AccordionContent from "./AccordionContent";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionContent,
    AccordionHeader,
  },
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof Accordion>;

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
      <Accordion.Item
        defaultOpen={props.defaultOpen}
        onOpenChange={console.log}
      >
        <Accordion.Header>Accordion header text</Accordion.Header>
        <SmallContent />
      </Accordion.Item>
    );
  }

  return props.controlled ? (
    <Accordion.Item open={open} onOpenChange={console.log}>
      <Accordion.Header onClick={() => setOpen(!open)}>
        Accordion header text
      </Accordion.Header>
      <Content />
    </Accordion.Item>
  ) : (
    <Accordion.Item onOpenChange={console.log}>
      <Accordion.Header>Accordion header text</Accordion.Header>
      <Content />
    </Accordion.Item>
  );
};

export const Controls: Story = {
  render: ({ ...props }) => {
    return (
      <div style={{ width: 500 }}>
        <Accordion {...props}>
          {[...Array(4)].map((_, y) => (
            <Item key={y} {...props} />
          ))}
        </Accordion>
      </div>
    );
  },
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
  },

  args: {
    variant: "default",
    headingSize: "medium",
    size: "medium",
    indent: true,
  },
};

export const DefaultOpen: Story = {
  render: () => {
    return (
      <div style={{ width: 500 }}>
        <Accordion>
          {[...Array(4)].map((_, y) => (
            <Item key={y} defaultOpen={y === 2} />
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div style={{ width: 500 }} className="colgap">
        <h3>Default</h3>
        <Accordion>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
        <h3>Neutral</h3>
        <Accordion variant="neutral">
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
      </div>
    );
  },
};

export const ControlledState: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
      <Accordion.Item open>
        <Accordion.Header>{`${size} size + ${headingSize} heading`}</Accordion.Header>
        <Accordion.Content>
          lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

const sizes: AccordionProps["size"][] = ["large", "medium", "small"];
const headingSizes: AccordionProps["headingSize"][] = [
  "large",
  "medium",
  "small",
  "xsmall",
];

export const Size: Story = {
  render: () => (
    <div style={{ width: 500 }} className="colgap">
      {sizes.map((size) => (
        <SingleHeaderAccordion key={size} size={size} />
      ))}
    </div>
  ),
};

export const HeadingSize: Story = {
  render: () => (
    <div style={{ width: 500 }} className="colgap">
      {headingSizes.map((size) => (
        <SingleHeaderAccordion key={size} headingSize={size} />
      ))}
    </div>
  ),
};

export const Indent: Story = {
  render: () => {
    return (
      <div style={{ width: 500 }} className="colgap">
        <h3>No indent</h3>
        <Accordion indent>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
        <h3>Indent</h3>
        <Accordion indent={false}>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>Variants</h2>
        {Variants.render?.(...props)}
      </div>
      <div>
        <h2>Size</h2>
        {Size.render?.(...props)}
      </div>
      <div>
        <h2>HeadingSize</h2>
        {HeadingSize.render?.(...props)}
      </div>
      <div>
        <h2>DefaultOpen</h2>
        {DefaultOpen.render?.(...props)}
      </div>
      <div>
        <h2>Indent</h2>
        {Indent.render?.(...props)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
