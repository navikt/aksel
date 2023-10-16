import React, { useEffect, useRef } from "react";
import { BodyLong, Heading, HelpText } from "..";

export default {
  title: "ds-react/HelpText",
  component: HelpText,
  parameters: {
    chromatic: { delay: 300 },
  },
  argTypes: {
    placement: {
      control: {
        type: "radio",
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
    },
    strategy: {
      control: {
        type: "radio",
        options: ["fixed", "absolute"],
      },
    },
  },
};

export const Default = {
  render: (props: any) => {
    return (
      <HelpText title="show tooltip" strategy="fixed" {...props}>
        Id ullamco excepteur elit fugiat labore.
      </HelpText>
    );
  },

  args: {
    title: "show tooltip",
  },
};

export const Open = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    ref.current && ref.current.click();
  }, []);

  return (
    <HelpText ref={ref} title="show tooltip" strategy="fixed">
      Incididunt laborum eiusmod ullamco id aliquip officia ex irure aliqua
      laboris id ea do nisi. Ex esse ad duis culpa non aliquip exercitation eu
      culpa cupidatat nisi. Deserunt voluptate consectetur cillum elit qui ad
      voluptate pariatur.
    </HelpText>
  );
};

export const WrapperClassName = {
  render: () => {
    return (
      <div>
        <BodyLong spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          perspiciatis vero voluptatum, asperiores cumque, deserunt accusantium
          ullam ipsa accusamus officia cupiditate quae unde esse culpa, ratione
          ab quam ea quas?
        </BodyLong>

        <Heading level="2" size="medium">
          67 år og 1 måneder øklasdjkl askdak døkasøk daøkdkølasøkld asølkdøka
          <HelpText wrapperClassName="testClass">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            perspiciatis vero voluptatum, asperiores cumque, deserunt
            accusantium ullam ipsa accusamus officia cupiditate quae unde esse
            culpa, ratione ab quam ea quas?
          </HelpText>
          <style>{`.testClass {display: inline-block; margin-left: 0.5rem; vertical-align: middle;}`}</style>
        </Heading>

        <BodyLong spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          perspiciatis vero voluptatum, asperiores cumque, deserunt accusantium
          ullam ipsa accusamus officia cupiditate quae unde esse culpa, ratione
          ab quam ea quas?
        </BodyLong>
      </div>
    );
  },
};
