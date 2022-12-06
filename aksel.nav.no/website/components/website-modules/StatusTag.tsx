import { Tag } from "@navikt/ds-react";

export const StatusTag = ({
  status,
  showStable = false,
}: {
  status: string;
  showStable?: boolean;
}) => {
  switch (status) {
    case "beta":
      return (
        <Tag variant="alt1" size="small">
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag variant="info" size="small">
          New
        </Tag>
      );
    case "ready":
      return showStable ? (
        <Tag variant="success" size="small">
          Stable
        </Tag>
      ) : null;
    case "deprecated":
      return (
        <Tag variant="neutral" size="small">
          Deprecated
        </Tag>
      );
    default:
      return null;
  }
};
