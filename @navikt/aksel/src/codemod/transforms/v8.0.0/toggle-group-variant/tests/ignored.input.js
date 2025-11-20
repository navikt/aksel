import { ToggleGroup } from "other-lib";
import { ToggleGroup as DsToggleGroup } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Should be ignored (wrong import) */}
      <ToggleGroup variant="info">Text</ToggleGroup>
    </div>
  );
};
