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
        <Tag size={size} data-color="meta-purple" {...rest}>
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag data-color="info" size={size} {...rest}>
          Ny
        </Tag>
      );
    case "ready":
      return showStable ? (
        <Tag data-color="success" size={size} {...rest}>
          Stabil
        </Tag>
      ) : null;
    case "deprecated":
      return (
        <Tag data-color="neutral" size={size} {...rest}>
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};
