import { Textarea } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Textarea
      label="Har du noen tilbakemeldinger?"
      description="Vi lagrer bare selve meldingen, ikke hvem som sendte den."
    />
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Bruk `description` i tillegg til `label` når det er behov for mer utfyllende forklaring.",
};
