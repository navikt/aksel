import React, { useEffect, useRef } from "react";
import { HelpText } from "..";

export default {
  title: "ds-react/HelpText",
  component: HelpText,
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

export const Default = (props: any) => {
  return (
    <HelpText title="show tooltip" strategy="fixed" {...props}>
      Id ullamco excepteur elit fugiat labore.
    </HelpText>
  );
};

Default.args = {
  title: "show tooltip",
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
