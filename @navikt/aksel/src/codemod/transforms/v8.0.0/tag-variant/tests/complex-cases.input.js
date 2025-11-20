import { Tag as MyTag } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Aliased import */}
      <MyTag variant="info">Aliased</MyTag>

      {/* Existing data-color should not be overwritten */}
      <MyTag variant="error" data-color="neutral">Existing data-color</MyTag>

      {/* Unknown variant should be ignored */}
      <MyTag variant="unknown">Unknown</MyTag>

      {/* Expression variant should not be ignored */}
      <MyTag variant={"info"}>Expression</MyTag>

      {/* No variant should be ignored */}
      <MyTag>No variant</MyTag>
    </div>
  );
};
