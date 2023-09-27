import { Tag } from "@navikt/ds-react";

export const StatusTag = ({
  status,
  showStable = false,
  ...rest
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
          {...rest}
        >
          Beta
        </Tag>
      );
    case "internal":
      return (
        <Tag
          variant="alt1"
          size="small"
          className="border-amber-400 bg-amber-50"
          {...rest}
        >
          Interne flater
        </Tag>
      );
    case "new":
      return (
        <Tag variant="info" size="small" {...rest}>
          Ny
        </Tag>
      );
    case "ready":
      return showStable ? (
        <Tag variant="success" size="small" {...rest}>
          Stabil
        </Tag>
      ) : null;
    case "deprecated":
      return (
        <Tag variant="neutral" size="small" {...rest}>
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};
