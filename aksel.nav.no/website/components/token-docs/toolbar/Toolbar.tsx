import { HStack } from "@navikt/ds-react";
import SearchField from "./SearchField";
import TokenFormatSelector from "./TokenFormatSelector";

const Toolbar = () => {
  return (
    <HStack
      as="nav"
      align="center"
      justify="space-between"
      marginBlock="0 4"
      gap="space-16"
    >
      <div style={{ width: "19rem" }}>
        <SearchField />
      </div>
      <HStack gap="2">
        <TokenFormatSelector />
      </HStack>
    </HStack>
  );
};

export default Toolbar;
