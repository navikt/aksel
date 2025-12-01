import { Button, Textarea, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8" style={{ maxHeight: "80vh" }}>
      <Textarea label="Din melding" maxLength={300} UNSAFE_autoScrollbar />
      <div>
        <Button>Send</Button>
      </div>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "Den ekspermentelle prop-en `UNSAFE_autoScrollbar` gjør at tekstfeltet får en scrollbar når det ikke er mer plass i høyden. Krever `display:flex` på parent.",
};
