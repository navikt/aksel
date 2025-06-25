import { Box, Stack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Stack
      gap="4"
      direction={{ xs: "column", md: "row" }}
      align={{ xs: "center", md: "start" }}
    >
      <Placeholder />
      <Placeholder height="2rem" />
      <Placeholder />
      <Placeholder height="2rem" />
    </Stack>
  );
};

const Placeholder = ({ height = "3rem" }: { height?: string }) => (
  <Box
    background="surface-alt-3"
    height={height}
    width="3rem"
    borderRadius="medium"
  />
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "full",
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "Ønsker du å endre fra 'row' til 'column' ved et brekkpunkt kan du bruke 'Stack'-komponenten. Husk også å oppdatere 'align' og 'justify' samtidig.",
};
