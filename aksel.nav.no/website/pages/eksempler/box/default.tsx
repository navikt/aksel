import { Box } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box
      padding="4"
      background="surface-default"
      borderColor="border-subtle"
      borderRadius="xlarge"
      shadow="xsmall"
    >
      This is a box
    </Box>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "Box lar deg lage en boks med padding, border og bakgrunn. Den kan brukes til å gruppere innhold, eller som en dekorativ boks.",
};
