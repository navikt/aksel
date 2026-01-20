import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Accordion, AccordionProps } from ".";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

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

const Item = ({ defaultOpen = false }) => (
  <Accordion.Item defaultOpen={defaultOpen} onOpenChange={console.log}>
    <Accordion.Header>Accordion header text</Accordion.Header>
    {defaultOpen ? <SmallContent /> : <Content />}
  </Accordion.Item>
);

export const Controls: Story = {
  render: (props) => {
    return (
      <Accordion {...props}>
        {[...Array(4)].map((_, y) => (
          <Item key={y} />
        ))}
      </Accordion>
    );
  },
  argTypes: {
    size: {
      options: ["large", "medium", "small"],
      control: { type: "select" },
    },
  },

  args: {
    size: "medium",
    indent: true,
  },
};

export const DefaultOpen: Story = {
  render: () => {
    return (
      <Accordion>
        {[...Array(4)].map((_, y) => (
          <Item key={y} defaultOpen={y === 2} />
        ))}
      </Accordion>
    );
  },
};

export const ControlledState: Story = {
  render: () => {
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
  },
};

const SingleHeaderAccordion = ({
  size = "medium",
}: Partial<AccordionProps>) => {
  return (
    <Accordion size={size}>
      <Accordion.Item>
        <Accordion.Header>{`${size} size heading`}</Accordion.Header>
        <Accordion.Content>a</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item open>
        <Accordion.Header>{`${size} size heading`}</Accordion.Header>
        <Accordion.Content>
          lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

const sizes: AccordionProps["size"][] = ["large", "medium", "small"];

export const Size: Story = {
  render: () => (
    <div className="colgap">
      {sizes.map((size) => (
        <SingleHeaderAccordion key={size} size={size} />
      ))}
    </div>
  ),
};

export const Indent: Story = {
  render: () => {
    return (
      <div className="colgap">
        <h3>Indent</h3>
        <Accordion indent>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
        <h3>No indent</h3>
        <Accordion indent={false}>
          {[...Array(2)].map((_, y) => (
            <Item key={y} defaultOpen />
          ))}
        </Accordion>
      </div>
    );
  },
};

export const ColorRole: Story = {
  render: () => {
    const items = [...Array(2)].map((_, i) => <Item key={i} />);
    return (
      <div className="colgap">
        <h3>Default</h3>
        <Accordion>{items}</Accordion>
        <h3>Magenta</h3>
        <h4>Magenta top level</h4>
        <div data-color="brand-magenta">
          <Accordion>{items}</Accordion>
        </div>
        <h4>Magenta component level</h4>
        <Accordion data-color="brand-magenta">{items}</Accordion>
      </div>
    );
  },
};

export const Chromatic = renderStoriesForChromatic({
  Size,
  DefaultOpen,
  Indent,
  ColorRole,
});
