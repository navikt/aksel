import { Heading, Label } from "@navikt/ds-react";
import cl from "clsx";

export const Tag = ({
  type,
  text,
  size = "medium",
}: {
  type: string;
  text?: string;
  size?: "medium" | "small";
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
        <Comp className="text-teal-600">{text ? text : "God praksis"}</Comp>
      );
    case "aksel_blogg":
      return <Comp className="text-violet-600">Blogg</Comp>;
    case "komponent_artikkel":
      return <Comp className="text-deepblue-600">Komponent</Comp>;
    case "ds_artikkel":
      return <Comp className="text-deepblue-600">Grunnleggende</Comp>;

    default:
      return null;
  }
};
