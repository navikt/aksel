import { Bleed, BodyLong, Box, HStack, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Page.Block width="text">
      <BodyLong spacing>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
        maximus mauris. Sed nec fermentum orci, vel tempus tortor. Praesent
        lectus neque, hendrerit et sollicitudin quis, imperdiet vel est.
      </BodyLong>
      <Bleed marginInline="full" asChild>
        <Box
          padding="space-12"
          marginBlock="space-0 space-28"
          background="brand-blue-moderate"
        >
          <HStack justify="center">
            Bleed med marginInline=&quot;full&quot;
          </HStack>
        </Box>
      </Bleed>
      <BodyLong>
        Sed euismod mi nec purus euismod scelerisque. Nam tristique tincidunt
        nisi ultricies sollicitudin. Etiam maximus ex sit amet turpis vestibulum
        pharetra.
      </BodyLong>
    </Page.Block>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Med marginInline=full kan du få enkeltelementer til å dekke hele skjermbredden mens resten av innholdet følger bredden satt av parent-container som vanlig. OBS: Du må kanskje sette 'overflow-x: hidden' på body for å unngå horisontal scrollbar.",
};
