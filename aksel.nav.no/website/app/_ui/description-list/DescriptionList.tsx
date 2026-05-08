import React from "react";
import { BodyLong, HGrid, VStack } from "@navikt/ds-react";
import type { ExtractPortableComponentProps } from "@/app/_sanity/types";

interface DescriptionListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: React.ReactNode;
    value: React.ReactNode;
  }[];
  variant?: "subtle" | "bold";
  direction?: "vertical" | "horizontal";
}

function AkselDescriptionList({
  items,
  variant = "subtle",
  direction,
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
        gap="space-8 space-16"
        columns="auto auto"
        width="fit-content"
        {...rest}
      >
        {itemsJsx}
      </HGrid>
    );
  }

  return (
    <VStack as="dl" gap="space-8" {...rest}>
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
