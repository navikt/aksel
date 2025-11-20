import { Tag } from "other-lib";
import { Tag as DsTag } from "@navikt/ds-react";

const Component = () => {
  return (
    <div>
      {/* Should be ignored (wrong import) */}
      <Tag variant="info">Text</Tag>
    </div>
  );
};
