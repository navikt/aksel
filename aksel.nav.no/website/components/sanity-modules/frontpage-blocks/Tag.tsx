import { Heading, Label, Tag as DsTag } from "@navikt/ds-react";
import cl from "clsx";

export const Tag = ({
  type,
  text,
  size = "medium",
  beta = false,
}: {
  type: string;
  text?: string;
  size?: "medium" | "small";
  beta?: boolean;
}) => {
  const Comp = ({ ...props }: any) =>
    size === "medium" ? (
      <Heading {...props} as="div" size="medium" />
    ) : (
      <Label
        {...props}
        as="div"
        size="small"
        className={cl(props?.className, "mb-2")}
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
            <DsTag variant="alt1" size="small">
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
