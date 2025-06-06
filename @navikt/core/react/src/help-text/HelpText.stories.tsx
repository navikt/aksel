import { Meta, StoryFn } from "@storybook/react";
import React, { useEffect, useRef } from "react";
import { BodyLong, Heading } from "../typography";
import HelpText from "./HelpText";

const meta: Meta<typeof HelpText> = {
  title: "ds-react/HelpText",
  component: HelpText,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

export const Default: StoryFn<typeof HelpText> = (props) => {
  return (
    <HelpText {...props}>Id ullamco excepteur elit fugiat labore.</HelpText>
  );
};

Default.args = {
  title: "Show tooltip",
};

Default.argTypes = {
  placement: {
    control: { type: "radio" },
    options: [
      "top",
      "bottom",
      "right",
      "left",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "right-start",
      "right-end",
      "left-start",
      "left-end",
    ],
  },
  strategy: {
    control: { type: "radio" },
    options: ["fixed", "absolute"],
  },
};

export const Open: StoryFn = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    ref.current?.click();
  }, []);

  return (
    <HelpText ref={ref} title="Show tooltip" strategy="fixed">
      Incididunt laborum eiusmod ullamco id aliquip officia ex irure aliqua
      laboris id ea do nisi. Ex esse ad duis culpa non aliquip exercitation eu
      culpa cupidatat nisi. Deserunt voluptate consectetur cillum elit qui ad
      voluptate pariatur.
    </HelpText>
  );
};

export const WrapperClassName: StoryFn = () => (
  <div>
    <BodyLong spacing>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
      perspiciatis vero voluptatum, asperiores cumque, deserunt accusantium
      ullam ipsa accusamus officia cupiditate quae unde esse culpa, ratione ab
      quam ea quas?
    </BodyLong>

    <Heading level="2" size="medium">
      67 år og 1 måneder øklasdjkl askdak døkasøk daøkdkølasøkld asølkdøka
      <HelpText wrapperClassName="testClass">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        perspiciatis vero voluptatum, asperiores cumque, deserunt accusantium
        ullam ipsa accusamus officia cupiditate quae unde esse culpa, ratione ab
        quam ea quas?
      </HelpText>
      <style>{`.testClass {display: inline-block; margin-left: 0.5rem; vertical-align: middle;}`}</style>
    </Heading>

    <BodyLong spacing>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
      perspiciatis vero voluptatum, asperiores cumque, deserunt accusantium
      ullam ipsa accusamus officia cupiditate quae unde esse culpa, ratione ab
      quam ea quas?
    </BodyLong>
  </div>
);

export const ColorRole: StoryFn = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    ref.current?.click();
  }, []);

  return (
    <HelpText
      ref={ref}
      title="Show tooltip"
      strategy="fixed"
      data-color="brand-magenta"
    >
      Incididunt laborum eiusmod ullamco id aliquip officia ex irure aliqua
      laboris id ea do nisi. Ex esse ad duis culpa non aliquip exercitation eu
      culpa cupidatat nisi. Deserunt voluptate consectetur cillum elit qui ad
      voluptate pariatur.
    </HelpText>
  );
};

export const Chromatic = () => {
  return (
    <div>
      <h2>Default</h2>
      <Default>{null}</Default>
      <h2>Open</h2>
      <Open />
      <h2>WrapperClassName</h2>
      <WrapperClassName />
      <h2>ColorRole</h2>
      <ColorRole />
    </div>
  );
};

Chromatic.parameters = {
  chromatic: { disable: false, delay: 300 },
};
