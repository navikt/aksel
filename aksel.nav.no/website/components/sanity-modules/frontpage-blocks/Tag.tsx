import { Heading, Label, Tag as DsTag } from "@navikt/ds-react";
import cl from "clsx";

export const Tag = ({
  type,
  text,
  size = "medium",
  beta = false,
  inline = false,
  ...rest
}: {
  type: string;
  text?: string;
  size?: "medium" | "small";
  beta?: boolean;
  inline?: boolean;
}) => {
  const Comp = ({ ...props }: any) =>
    size === "medium" ? (
      <Heading {...props} as="div" size="medium" {...rest} />
    ) : (
      <Label
        {...rest}
        {...props}
        as="div"
        size="small"
        className={cl(props?.className, !inline && "mb-2")}
      />
    );

  switch (type) {
    case "aksel_artikkel":
      return (
        <Comp className="text-teal-700">{text ? text : "God praksis"}</Comp>
      );
    case "aksel_blogg":
      return <Comp className="text-pink-600">Blogg</Comp>;
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

    default:
      return null;
  }
};
