import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import Summary from "./Summary";

const meta: Meta<typeof Summary> = {
  title: "ds-react/Summary",
  component: Summary,
  decorators: [
    (story) => (
      <div style={{ width: 600, maxWidth: "100%", margin: "0 auto" }}>
        {story()}
      </div>
    ),
  ],
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryFn<typeof Summary> = () => (
  <>
    <Summary>
      <Summary.Header>
        <Summary.Heading>Personalia</Summary.Heading>
        <Summary.EditButton />
      </Summary.Header>

      <Summary.Answers>
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
            <Summary.Answers>
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
            </Summary.Answers>
          </Summary.Value>
        </Summary.Answer>
      </Summary.Answers>
    </Summary>

    <h2>Long texts</h2>
    <Summary>
      <Summary.Header>
        <Summary.Heading>
          Arbeidsforhold som du har i eller utenfor EØS-området
        </Summary.Heading>
        <Summary.EditButton />
      </Summary.Header>
      <Summary.Answers>
        <Summary.Answer>
          <Summary.Label>
            Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i
            løpet av de siste 36 månedene?
          </Summary.Label>
          <Summary.Value>
            Nei, jeg har ikke jobbet i et annet EØS-land, Sveits eller
            Storbritannia i løpet av de siste 36 månedene.
          </Summary.Value>
        </Summary.Answer>
      </Summary.Answers>
    </Summary>
  </>
);
