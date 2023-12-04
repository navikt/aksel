import { Box, Chips, HStack, Label } from "@navikt/ds-react";

function ChipNav() {
  return (
    <Box paddingBlock="6 0">
      <HStack gap="2" align="center">
        <Label as="p" className="text-aksel-heading">
          Innholdstyper:
        </Label>
        <Chips>
          <Chips.Toggle variant="neutral" checkmark={false}>
            Metode
          </Chips.Toggle>
          <Chips.Toggle variant="neutral" checkmark={false}>
            Teori
          </Chips.Toggle>
          <Chips.Toggle variant="neutral" checkmark={false}>
            Verktøy
          </Chips.Toggle>
          <Chips.Toggle variant="neutral" checkmark={false}>
            Strategi
          </Chips.Toggle>
          <Chips.Toggle variant="neutral" checkmark={false}>
            Prinsipp
          </Chips.Toggle>
        </Chips>
      </HStack>
    </Box>
  );
}

export default ChipNav;
