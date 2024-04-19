import { FormSummary } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">
          Personal information
        </FormSummary.Heading>
        <FormSummary.EditLink href="#">Edit</FormSummary.EditLink>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Name</FormSummary.Label>
          <FormSummary.Value>John Doe</FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
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
  index: 2,
};
