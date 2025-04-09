import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { HStack, Select, ToggleGroup } from "@navikt/ds-react";
import SearchField from "./SearchField";

const Toolbar = () => {
  return (
    <HStack as="nav" align="center" justify="space-between" marginBlock="0 4">
      <div style={{ width: "19rem" }}>
        <SearchField />
      </div>
      <HStack gap="2" width="">
        <Select label="Velg bostedsland" hideLabel style={{ width: "9rem" }}>
          <option value="css">CSS</option>
          <option value="js">JS</option>
        </Select>
        <ToggleGroup defaultValue="light" onChange={console.info}>
          <ToggleGroup.Item
            value="light"
            icon={<SunIcon title="Lys modus" />}
          />
          <ToggleGroup.Item
            value="dark"
            icon={<MoonIcon title="Mørk modus" />}
          />
        </ToggleGroup>
      </HStack>
    </HStack>
  );
};

export default Toolbar;
