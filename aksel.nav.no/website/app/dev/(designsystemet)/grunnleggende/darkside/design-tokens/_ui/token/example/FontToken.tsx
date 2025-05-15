import { LineHeightIcon } from "@navikt/aksel-icons";
import { Heading, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../types";

const FontToken = ({ token }: { token: TokenForDocumentationT }) => {
  let fontStyling = {
    fontSize: "var(--ax-font-size-heading-medium)",
    fontFamily: "var(--ax-font-family)",
    fontWeight: "var(--ax-font-weight-regular)",
    lineHeight: "var(--ax-font-line-height-heading-xsmall)",
  };
  let isTokenGroupUnknown = false;
  switch (token.group) {
    case "family":
      fontStyling = {
        ...fontStyling,
        fontFamily: token.cssValue,
      };
      break;
    case "size":
      fontStyling = {
        ...fontStyling,
        fontSize: token.cssValue,
      };
      break;
    case "weight":
      fontStyling = {
        ...fontStyling,
        fontWeight: token.cssValue,
      };
      break;
    case "line-height":
      return (
        <VStack as="div" align="center" justify="center" height="100%">
          <LineHeightIcon width="32px" height="32px" title={token.name} />
        </VStack>
      );
    default:
      console.warn("Unknown token group", token);
      isTokenGroupUnknown = true;
  }
  return (
    <VStack
      as="div"
      align="center"
      justify="center"
      height="100%"
      className={isTokenGroupUnknown ? "vk-error" : undefined}
    >
      <Heading as="span" size="medium" style={fontStyling}>
        Aa
      </Heading>
    </VStack>
  );
};

export default FontToken;
