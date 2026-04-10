import { PrinterLargeIcon } from "@navikt/aksel-icons";
import { Button, HStack, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-16">
      <Tooltip content="Skriv ut dokument">
        <Button icon={<PrinterLargeIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument" describesChild>
        <Button>Skriv ut</Button>
      </Tooltip>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Hvis elementet allerede har en tilgjengelig tekst, kan du sette `describesChild` til `true`. Tooltipen blir da satt som `title` når lukket og `aria-describedby` når åpen, slik at skjermleser får med seg begge tekstene.",
};
