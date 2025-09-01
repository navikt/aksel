import { FormSummary, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
      </FormSummary.Header>

      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Navn</FormSummary.Label>
          <FormSummary.Value>Ola Nordmann</FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Adresse</FormSummary.Label>
          <FormSummary.Value>
            Gate 123
            <br />
            1234 Sted
          </FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Fødselsnummer</FormSummary.Label>
          <FormSummary.Value>123456 78910</FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Barn nr. 1</FormSummary.Label>
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

        <FormSummary.Answer>
          <FormSummary.Label>Kontaktinformasjon</FormSummary.Label>
          <FormSummary.Value>
            <Link href="/eksempel">Fyll ut kontaktinformasjon</Link>
          </FormSummary.Value>
        </FormSummary.Answer>

        <FormSummary.Answer>
          <FormSummary.Label>Hvordan vil du bli varslet?</FormSummary.Label>
          <FormSummary.Value>E-post</FormSummary.Value>
          <FormSummary.Value>SMS</FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href="/eksempel" />
      </FormSummary.Footer>
    </FormSummary>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
