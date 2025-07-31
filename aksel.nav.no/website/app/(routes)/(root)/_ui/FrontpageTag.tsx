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
  const Comp = ({ children }) => {
    return (
      <DsTag variant="info" size={size}>
        {children}
      </DsTag>
    );
  };

  switch (type) {
    case "aksel_artikkel":
      return <Comp>{text ? text : "God praksis"}</Comp>;
    case "aksel_blogg":
      return <Comp>Blogg</Comp>;
    case "komponent_artikkel":
      return (
        <>
          <Comp>Komponent</Comp>
        </>
      );
    case "ds_artikkel":
      return (
        <>
          <Comp>Grunnleggende</Comp>
        </>
      );
    case "templates_artikkel":
      return (
        <>
          <Comp>Mønster og Maler</Comp>
        </>
      );
    case "aksel_prinsipp":
      return <Comp>Prinsipper</Comp>;
    case "aksel_standalone":
      return <Comp>Unike sider</Comp>;

    default:
      return null;
  }
};

export const BetaTag = () => {
  return (
    <DsTag variant="alt1" size="small">
      Beta
    </DsTag>
  );
};
