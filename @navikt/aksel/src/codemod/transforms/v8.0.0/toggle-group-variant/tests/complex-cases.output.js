import { ToggleGroup as MyToggleGroup } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Aliased import */}
      <MyToggleGroup data-color="accent">Aliased</MyToggleGroup>
      {/* Existing data-color should not be overwritten */}
      <MyToggleGroup data-color="neutral">Existing data-color</MyToggleGroup>
      {/* Unknown variant should be ignored */}
      <MyToggleGroup variant="unknown">Unknown</MyToggleGroup>
      {/* Expression variant should not be ignored */}
      <MyToggleGroup data-color="accent">Expression</MyToggleGroup>
      {/* No variant should be ignored */}
      <MyToggleGroup>No variant</MyToggleGroup>
    </div>
  );
};
