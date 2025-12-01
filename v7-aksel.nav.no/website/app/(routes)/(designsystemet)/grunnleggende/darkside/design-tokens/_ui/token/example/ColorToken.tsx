import { PaletteIcon } from "@navikt/aksel-icons";
import { Box, Heading, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../types";

const ColorToken = ({ token }: { token: TokenForDocumentationT }) => {
  switch (token.category) {
    case "backgroundColor":
      return (
        <Box.New
          borderColor="neutral-subtle"
          borderRadius="full"
          borderWidth="1"
          style={{ backgroundColor: token.cssValue }}
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
          style={{ borderColor: token.cssValue }}
        />
      );
    case "textColor": {
      if (token.modifier === "icon") {
        return (
          <Box.New width="32px" height="32px">
            <VStack as="div" align="center" justify="center" height="100%">
              <PaletteIcon
                title="a11y-title"
                color={token.cssValue}
                fontSize="var(--ax-font-size-heading-medium)"
              />
            </VStack>
          </Box.New>
        );
      }
      return (
        <Box.New width="32px" height="32px">
          <VStack as="div" align="center" justify="center" height="100%">
            <Heading as="span" size="medium" style={{ color: token.cssValue }}>
              Aa
            </Heading>
          </VStack>
        </Box.New>
      );
    }
    default:
      console.warn("Unknown token category", token);
      return (
        <Box.New
          borderColor="neutral-subtle"
          borderRadius="full"
          borderWidth="1"
          style={{ backgroundColor: token.cssValue }}
          width="32px"
          height="32px"
          className="vk-error"
        />
      );
  }
};

export default ColorToken;
