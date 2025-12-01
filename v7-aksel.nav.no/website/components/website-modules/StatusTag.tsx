import { Tag } from "@navikt/ds-react";

export const StatusTag = ({
  status,
  showStable = false,
  size = "small",
  ...rest
}: {
  size?: "small" | "xsmall";
  status: string;
  showStable?: boolean;
}) => {
  switch (status) {
    case "beta":
      return (
        <Tag variant="alt1" size={size} data-color="meta-purple" {...rest}>
          Beta
        </Tag>
      );
    case "internal":
      return (
        <Tag variant="warning" size={size} data-color="warning" {...rest}>
          Interne flater
        </Tag>
      );
    case "new":
      return (
        <Tag variant="info" size={size} {...rest}>
          Ny
        </Tag>
      );
    case "ready":
      return showStable ? (
        <Tag variant="success" size={size} {...rest}>
          Stabil
        </Tag>
      ) : null;
    case "deprecated":
      return (
        <Tag variant="neutral" size={size} {...rest}>
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};
