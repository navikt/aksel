import { defineField, defineType } from "sanity";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { AkselDescriptionList } from "@/app/_ui/description-list/DescriptionList";

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
