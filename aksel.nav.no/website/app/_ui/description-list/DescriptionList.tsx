import React from "react";
import { BodyLong, HGrid } from "@navikt/ds-react";
import type { ExtractPortableComponentProps } from "@/app/_sanity/types";

//import "./DescriptionList.css"; // Needed for divider

interface DescriptionListProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: React.ReactNode;
    value: React.ReactNode;
  }[];
  variant?: "subtle" | "bold";
  direction?: "vertical" | "horizontal";
  divider?: boolean;
}

function AkselDescriptionList({
  items,
  variant = "subtle",
  direction,
  divider,
  ...rest
}: DescriptionListProps) {
  const ItemWrapper = direction === "horizontal" ? React.Fragment : "div";

  return (
    <HGrid
      as="dl"
      className={divider ? "description-list--with-divider" : ""}
      columns={direction === "horizontal" ? "auto auto" : "auto"}
      gap="space-8 space-16"
      width="fit-content"
      position="relative"
      {...rest}
    >
      {items.map((item, index) => (
        <ItemWrapper key={index}>
          <BodyLong
            as="dt"
            textColor={variant === "subtle" ? "subtle" : undefined}
            weight={variant === "bold" ? "semibold" : undefined}
          >
            {item.label}
          </BodyLong>
          <BodyLong
            as="dd"
            textColor={variant === "bold" ? "subtle" : undefined}
          >
            {item.value}
          </BodyLong>
        </ItemWrapper>
      ))}
    </HGrid>
  );
}

function DescriptionList(
  props: ExtractPortableComponentProps<"description_list">,
) {
  const { items } = props.value;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <AkselDescriptionList
      items={items as Required<(typeof items)[number]>[]}
      variant="bold"
      direction="horizontal"
      style={{ marginBottom: "var(--ax-space-28)" }}
    />
  );
}

export { AkselDescriptionList, DescriptionList };
