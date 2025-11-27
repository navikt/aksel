import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { Tag } from "@navikt/ds-react";

function GodPraksisTaxonomyTag({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "innholdstype" | "undertema";
}) {
  if (!children) {
    return null;
  }

  return (
    <Tag
      variant="moderate"
      data-color={type === "undertema" ? "info" : "meta-purple"}
      size="xsmall"
      icon={
        type === "undertema" ? (
          <TagFillIcon aria-hidden />
        ) : (
          <FileFillIcon aria-hidden />
        )
      }
    >
      {children}
    </Tag>
  );
}

export { GodPraksisTaxonomyTag };
