import { withDsExample } from "@/web/examples/withDsExample";
import { Stack } from "@navikt/ds-react";

const Example = () => {
  return (
    <Stack
      gap="4"
      direction={{ xs: "column", md: "row" }}
      align={{ xs: "center", md: "start" }}
    >
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Stack>
  );
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500 even:h-8" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "full",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "Ønsker du å endre fra 'row' til 'column' ved et brekkpunkt kan du bruke 'Stack'-komponenten. Husk å også oppdatere 'align' og 'justify' samtidig.",
};
