import React from "react";
import { BodyLong, HGrid, VStack } from "@navikt/ds-react";
import type { ExtractPortableComponentProps } from "@/app/_sanity/types";
import "./DescriptionList.css";

interface DescriptionListProps extends React.HTMLAttributes<HTMLDivElement> {
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
  const itemsJsx = items.map((item, index) => (
    <React.Fragment key={index}>
      <BodyLong
        as="dt"
        textColor={variant === "subtle" ? "subtle" : undefined}
        weight={variant === "bold" ? "semibold" : undefined}
      >
        {item.label}
      </BodyLong>
      <BodyLong as="dd" textColor={variant === "bold" ? "subtle" : undefined}>
        {item.value}
      </BodyLong>
    </React.Fragment>
  ));

  if (direction === "horizontal") {
    return (
      <HGrid
        as="dl"
        className={divider ? "description-list--horizontal" : ""}
        gap="space-8 space-16"
        columns="auto auto"
        width="fit-content"
        position="relative"
        {...rest}
      >
        {itemsJsx}
      </HGrid>
    );
  }

  return (
    <VStack
      as="dl"
      className={divider ? "description-list--vertical" : ""}
      gap="space-8"
      width="fit-content"
      position="relative"
      {...rest}
    >
      {itemsJsx.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </VStack>
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
