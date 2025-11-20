import { ToggleGroup as MyToggleGroup } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Aliased import */}
      <MyToggleGroup variant="action">Aliased</MyToggleGroup>

      {/* Existing data-color should not be overwritten */}
      <MyToggleGroup variant="action" data-color="neutral">Existing data-color</MyToggleGroup>

      {/* Unknown variant should be ignored */}
      <MyToggleGroup variant="unknown">Unknown</MyToggleGroup>

      {/* Expression variant should not be ignored */}
      <MyToggleGroup variant={"action"}>Expression</MyToggleGroup>

      {/* No variant should be ignored */}
      <MyToggleGroup>No variant</MyToggleGroup>
    </div>
  );
};
