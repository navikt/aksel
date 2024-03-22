import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import FormSummary from "./FormSummary";

const meta: Meta<typeof FormSummary> = {
  title: "ds-react/FormSummary",
  component: FormSummary,
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

export const Default: StoryFn<typeof FormSummary> = () => (
  <>
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading>Personalia</FormSummary.Heading>
        <FormSummary.EditButton />
      </FormSummary.Header>

      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Navn</FormSummary.Label>
          <FormSummary.Value>Ola Nordmann</FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Fødselsnummer</FormSummary.Label>
          <FormSummary.Value>12345678910</FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Barn nr 1</FormSummary.Label>
          <FormSummary.Value>
            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>Kari Nordmann</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Kjønn</FormSummary.Label>
                <FormSummary.Value>Jente</FormSummary.Value>
              </FormSummary.Answer>
              <FormSummary.Answer>
                <FormSummary.Label>Alder</FormSummary.Label>
                <FormSummary.Value>6</FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
    </FormSummary>

    <h2>Long texts</h2>
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading>
          Arbeidsforhold som du har i eller utenfor EØS-området
        </FormSummary.Heading>
        <FormSummary.EditButton />
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>
            Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i
            løpet av de siste 36 månedene?
          </FormSummary.Label>
          <FormSummary.Value>
            Nei, jeg har ikke jobbet i et annet EØS-land, Sveits eller
            Storbritannia i løpet av de siste 36 månedene.
          </FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
    </FormSummary>
  </>
);
