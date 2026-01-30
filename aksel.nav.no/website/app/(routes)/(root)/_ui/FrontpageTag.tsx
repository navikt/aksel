import { Tag as DsTag } from "@navikt/ds-react";

export const Tag = ({
  type,
  text,
  size = "small",
}: {
  type: string;
  text?: string;
  size?: "medium" | "small" | "xsmall";
  inline?: boolean;
  hTag?: string;
  count?: number;
}) => {
  switch (type) {
    case "aksel_artikkel":
      return (
        <DsTag variant="info" size={size}>
          {text ? text : "God praksis"}
        </DsTag>
      );
    case "aksel_blogg":
      return (
        <DsTag variant="info" size={size}>
          Blogg
        </DsTag>
      );
    case "komponent_artikkel":
      return (
        <DsTag variant="info" size={size}>
          Komponent
        </DsTag>
      );
    case "ds_artikkel":
      return (
        <DsTag variant="info" size={size}>
          Grunnleggende
        </DsTag>
      );
    case "templates_artikkel":
      return (
        <DsTag variant="info" size={size}>
          Mönster og Maler
        </DsTag>
      );
    case "aksel_prinsipp":
      return (
        <DsTag variant="info" size={size}>
          Prinsipper
        </DsTag>
      );
    case "aksel_standalone":
      return (
        <DsTag variant="info" size={size}>
          Unike sider
        </DsTag>
      );

    default:
      return null;
  }
};
