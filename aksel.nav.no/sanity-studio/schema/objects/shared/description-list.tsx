import React from "react";
import { defineField, defineType } from "sanity";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { BodyLong, HGrid } from "@navikt/ds-react";

export const DescriptionList = defineType({
  title: "Definisjonsliste",
  name: "description_list",
  type: "object",
  icon: () => <MenuHamburgerIcon aria-hidden />,
  fields: [
    defineField({
      title: "Elementer",
      type: "array",
      name: "items",
      validation: (Rule) => Rule.required(),
      of: [
        {
          title: "Element",
          name: "item",
          type: "object",
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
          fields: [
            defineField({
              title: "Etikett",
              type: "string",
              name: "label",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Beskrivelse",
              type: "string",
              name: "value",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  components: {
    preview: (props: any) => {
      if (!props.items || (!props.items[0].label && !props.items[0].value))
        return "Tom liste";
      return (
        <AkselDescriptionList items={props.items} direction="horizontal" />
      );
    },
  },
  preview: {
    select: {
      items: "items",
    },
    prepare(props) {
      return {
        title: "Definisjonsliste",
        ...props,
      };
    },
  },
});

interface DescriptionListProps extends React.HTMLAttributes<HTMLElement> {
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
  const ItemWrapper = direction === "horizontal" ? React.Fragment : "div";

  return (
    <HGrid
      as="dl"
      columns={direction === "horizontal" ? "auto auto" : "auto"}
      gap="space-8 space-16"
      width="fit-content"
      position="relative"
      {...rest}
    >
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Handle more gracefully in the future
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
