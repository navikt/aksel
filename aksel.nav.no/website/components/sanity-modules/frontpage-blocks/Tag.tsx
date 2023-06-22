import { Heading, Label, Tag as DsTag } from "@navikt/ds-react";
import cl from "clsx";

export const Tag = ({
  type,
  text,
  size = "medium",
  beta = false,
  inline = false,
  hTag,
  count,
  ...rest
}: {
  type: string;
  text?: string;
  size?: "medium" | "small" | "xsmall";
  beta?: boolean;
  inline?: boolean;
  hTag?: string;
  count?: number;
}) => {
  const Comp = ({ ...props }: any) =>
    size === "medium" || size === "small" ? (
      <Heading {...rest} {...props} as={hTag ?? "div"} size={size}>
        {props.children}
        {`${count ? ` (${count})` : ""}`}
      </Heading>
    ) : (
      <Label
        {...rest}
        {...props}
        as={hTag ?? "div"}
        size="small"
        className={cl(props?.className, !inline && "mb-2")}
      >
        {props.children}
        {`${count ? ` (${count})` : ""}`}
      </Label>
    );

  switch (type) {
    case "aksel_artikkel":
      return (
        <Comp className="text-teal-700">{text ? text : "God praksis"}</Comp>
      );
    case "aksel_blogg":
      return <Comp className="text-pink-700">Blogg</Comp>;
    case "komponent_artikkel":
      return (
        <Comp className="text-deepblue-600 flex items-center gap-3">
          Komponent
          {beta && (
            <DsTag
              variant="alt1"
              size="small"
              className="border-violet-300 bg-violet-50"
            >
              Beta
            </DsTag>
          )}
        </Comp>
      );
    case "ds_artikkel":
      return (
        <Comp className="text-deepblue-600 flex items-center gap-3">
          Grunnleggende
          {beta && (
            <DsTag variant="alt1" size="small">
              Beta
            </DsTag>
          )}
        </Comp>
      );
    case "aksel_prinsipp":
      return (
        <Comp className="flex items-center gap-3 text-violet-800">
          Prinsipper
        </Comp>
      );
    case "aksel_standalone":
      return (
        <Comp className="flex items-center gap-3 text-violet-800">
          Unike sider
        </Comp>
      );

    default:
      return null;
  }
};
