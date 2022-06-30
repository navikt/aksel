import React, { useEffect, useRef } from "react";
import { TextField, HelpText } from "..";

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
      Id ullamco excepteur elit fugiat labore.
    </HelpText>
  );
};
