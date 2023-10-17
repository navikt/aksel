import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        <Bleed marginInline="10" asChild>
          <Box padding="3" className="p" background="surface-alt-3-subtle">
            <HStack justify="center">
              <BodyLong>Med asChild</BodyLong>
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
  index: 4,
  desc: "Vi anbefaler å bruke 'asChild'-prop der mulig. Dette reduserer dom-noder og forenkler output. For at Bleed + child-komponent skal fungere må child kunne ta inn 'className' og 'style' som prop.",
};
