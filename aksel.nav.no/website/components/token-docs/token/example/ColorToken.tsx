import { PaletteIcon } from "@navikt/aksel-icons";
import { Box, Heading, VStack } from "@navikt/ds-react";

const ColorToken = ({ token }: { token: any }) => {
  switch (token.category) {
    case "backgroundColor":
      return (
        <Box.New
          borderColor="neutral-subtle"
          borderRadius="full"
          borderWidth="1"
          style={{ backgroundColor: token.value }}
          width="32px"
          height="32px"
        />
      );
    case "borderColor":
      return (
        <Box.New
          borderRadius="full"
          borderWidth="4"
          width="32px"
          height="32px"
          style={{ borderColor: token.value }}
        />
      );
    case "textColor": {
      if (token.modifier === "icon") {
        return (
          <Box.New width="32px" height="32px">
            <VStack as="div" align="center" justify="center" height="100%">
              <PaletteIcon
                title="a11y-title"
                color={token.value}
                fontSize="1.5rem"
              />
            </VStack>
          </Box.New>
        );
      }
      return (
        <Box.New width="32px" height="32px">
          <VStack as="div" align="center" justify="center" height="100%">
            <Heading size="medium" style={{ color: token.value }}>
              Aa
            </Heading>
          </VStack>
        </Box.New>
      );
    }
    default:
      return (
        <Box.New
          borderRadius="medium"
          borderWidth="1"
          background={token.value}
          width="32px"
          height="32px"
        />
      );
  }
};

export default ColorToken;
