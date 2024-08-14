import { PrinterLargeIcon } from "@navikt/aksel-icons";
import { Button, HStack, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="4">
      <Tooltip content="Skriv ut dokument" describesChild={false}>
        <Button icon={<PrinterLargeIcon aria-hidden />} />
      </Tooltip>
      <Tooltip content="Skriv ut dokument">
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
  desc: "Hvis Tooltip er eneste form for tekstlig beskrivelse, bør du sette 'describeChild' til 'false'. Tooltip content blir da satt som 'aria-label' og f.eks. knappen vil oppleves likt for hjelpemidler som for seende brukere.",
};
