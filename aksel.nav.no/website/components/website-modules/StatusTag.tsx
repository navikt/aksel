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
        <Tag
          variant="alt1"
          size="small"
          className="border-violet-300 bg-violet-50"
        >
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag variant="info" size="small">
          Ny
        </Tag>
      );
    case "ready":
      return showStable ? (
        <Tag variant="success" size="small">
          Stabil
        </Tag>
      ) : null;
    case "deprecated":
      return (
        <Tag variant="neutral" size="small">
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};
