import { FormSummary, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="8">
      <FormSummary>
        <FormSummary.Header>
          <FormSummary.Heading>Personalia</FormSummary.Heading>
          <FormSummary.EditLink href="#" aria-label="Endre svar" />
        </FormSummary.Header>

        <FormSummary.Answers>
          <FormSummary.Answer>
            <FormSummary.Label>Navn</FormSummary.Label>
            <FormSummary.Value>Ola Nordmann</FormSummary.Value>
          </FormSummary.Answer>
        </FormSummary.Answers>
      </FormSummary>
      <FormSummary>
        <FormSummary.Header>
          <FormSummary.Heading>Personal</FormSummary.Heading>
          <FormSummary.EditLink href="#" aria-label="Uppdatera information">
            Uppdatera information
          </FormSummary.EditLink>
        </FormSummary.Header>

        <FormSummary.Answers>
          <FormSummary.Answer>
            <FormSummary.Label>Namn</FormSummary.Label>
            <FormSummary.Value>Sverre Svenska</FormSummary.Value>
          </FormSummary.Answer>
        </FormSummary.Answers>
      </FormSummary>
    </VStack>
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
