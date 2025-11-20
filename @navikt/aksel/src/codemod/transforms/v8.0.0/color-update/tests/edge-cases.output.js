import { Tag as MyTag } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Aliased import */}
      <MyTag data-color="info" variant="outline">Aliased</MyTag>

      {/* Existing data-color should not be overwritten */}
      <MyTag variant="outline" data-color="neutral">Existing data-color</MyTag>

      {/* Unknown variant should be ignored */}
      <MyTag variant="unknown">Unknown</MyTag>

      {/* Expression variant should not be ignored */}
      <MyTag variant={"outline"} data-color="info">Expression</MyTag>

      {/* No variant should be ignored */}
      <MyTag>No variant</MyTag>

      {/* Comments should be preserved */}
      <MyTag
        // Comment before
        data-color="success"
        variant="outline" // Comment inline
        // Comment after
      >
        Comments
      </MyTag>
    </div>
  );
};
