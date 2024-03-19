import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Summary from "./Summary";

const meta: Meta<typeof Summary> = {
  title: "ds-react/Summary",
  component: Summary,
  decorators: [(story) => <div style={{ width: "680px" }}>{story()}</div>],
};
export default meta;

export const Default2: StoryObj<typeof Summary> = {
  render: () => {
    return (
      <Summary>
        <Summary.Header>
          <Summary.Heading>Personalia</Summary.Heading>
          <Summary.EditButton />
        </Summary.Header>

        <Summary.Answer>
          <Summary.Label>Navn</Summary.Label>
          <Summary.Value>Ola Nordmann</Summary.Value>
        </Summary.Answer>

        <Summary.Answer>
          <Summary.Label>Fødselsnummer</Summary.Label>
          <Summary.Value>12345678910</Summary.Value>
        </Summary.Answer>

        <Summary.Answer>
          <Summary.Label>Barn nr 1</Summary.Label>
          <Summary.Value>
            <Summary.Answer>
              <Summary.Label>Navn</Summary.Label>
              <Summary.Value>Kari Nordmann</Summary.Value>
            </Summary.Answer>
            <Summary.Answer>
              <Summary.Label>Kjønn</Summary.Label>
              <Summary.Value>Jente</Summary.Value>
            </Summary.Answer>
            <Summary.Answer>
              <Summary.Label>Alder</Summary.Label>
              <Summary.Value>6</Summary.Value>
            </Summary.Answer>
          </Summary.Value>
        </Summary.Answer>
      </Summary>
    );
  },
};
