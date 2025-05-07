import { HStack } from "@navikt/ds-react";
import SearchField from "./SearchField";
import TokenFormatSelector from "./TokenFormatSelector";

const Toolbar = () => {
  return (
    <HStack
      as="nav"
      align="center"
      justify="space-between"
      marginBlock="space-0 space-16"
      gap="space-16"
    >
      <SearchField />
      <TokenFormatSelector />
    </HStack>
  );
};

export default Toolbar;
