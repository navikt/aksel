import { TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <TextField label="Navn" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};

// TODO: Bedre eksempel-label. Feks. Navn

// Senere: Se nærmere på autoformatering, type=number (hindre at man kan skrive inn ugyldige tegn)
