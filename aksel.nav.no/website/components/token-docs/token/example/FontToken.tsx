import { LineHeightIcon } from "@navikt/aksel-icons";
import { Heading, VStack } from "@navikt/ds-react";
import { TokenForDocumentationT } from "../../../types/tokens";

const FontToken = ({ token }: { token: TokenForDocumentationT }) => {
  let fontStyling = {
    fontSize: "24px",
    fontFamily: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
  };
  switch (token.group) {
    case "family":
      fontStyling = {
        ...fontStyling,
        fontFamily: token.value,
      };
      break;
    case "size":
      fontStyling = {
        ...fontStyling,
        fontSize: token.value,
      };
      break;
    case "weight":
      fontStyling = {
        ...fontStyling,
        fontWeight: token.value,
      };
      break;
    case "line-height":
      return (
        <VStack as="div" align="center" justify="center" height="100%">
          <LineHeightIcon width="32px" height="32px" title={token.name} />
        </VStack>
      );
  }
  return (
    <VStack as="div" align="center" justify="center" height="100%">
      <Heading size="medium" style={fontStyling}>
        Aa
      </Heading>
    </VStack>
  );
};

export default FontToken;
