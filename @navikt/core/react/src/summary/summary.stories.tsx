import { Meta } from "@storybook/react";
import React from "react";
import Summary, { SummaryProps } from "./Summary";

export default {
  title: "ds-react/Summary",
  component: Summary,
} satisfies Meta<typeof Summary>;

const exampleItems: SummaryProps["items"] = [
  {
    title: "Personalia",
    editLink: "#",
    content: [
      {
        title: "Navn",
        content: "Ola Nordmann",
        customContentSection: [],
      },
      {
        title: "Fødselsnummer",
        content: "12345678910",
        customContentSection: [],
      },
    ],
  },
  {
    title: "Bostedsland",
    editLink: "#",
    content: [
      {
        title: "Hvilket land bor du i?",
        content: "Norge",
        customContentSection: [],
      },
    ],
  },
];

export const Default = {
  render: (props: { items: SummaryProps["items"] }) => {
    return <Summary items={props.items} />;
  },

  args: {
    items: exampleItems,
  },
};
