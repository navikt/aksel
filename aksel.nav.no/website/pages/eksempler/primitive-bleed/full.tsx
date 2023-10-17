import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        <Bleed marginInline="full" asChild>
          <Box padding="3" className="p" background="surface-alt-3-subtle">
            <HStack justify="center">
              <BodyLong>Full</BodyLong>
            </HStack>
          </Box>
        </Bleed>
      </Box>
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
  index: 3,
  desc: "Full lar Bleed bryte ut av parent og dekke hele skjermbredden. Dette kan være nyttig for 'Heroes' eller lignende elementer som ønsker å bryte ut av parent-layout",
};
