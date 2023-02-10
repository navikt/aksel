import { Expand } from "@navikt/ds-icons";
import { Label } from "@navikt/ds-react";
import { StackCompactIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Accordion = defineType({
  name: "accordion",
  title: "Accordion",
  type: "object",
  icon: StackCompactIcon,
  fields: [
    defineField({
      title: "Accordion-liste",
      description:
        "Legg til Accordion i listen (bør alltid være 2 eller flere)",
      name: "list",
      type: "array",
      of: [
        {
          title: "Accordion",
          name: "element",
          type: "object",
          fields: [
            {
              title: "Accordion header",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha en header"),
            },
            {
              title: "Innhold",
              name: "content",
              type: "riktekst_standard",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Accordion modul må ha minst 1 element"),
    }),
  ],
  components: {
    preview: (val: any) => {
      return val?.list ? (
        <div>
          {val.list.map((x) => (
            <div
              key={x._key}
              className="border-b-border flex w-full justify-between border-b py-2 px-4 "
            >
              <span>{x.title}</span>
              <Expand aria-hidden />
            </div>
          ))}
        </div>
      ) : (
        <Label as="p">Accordion (0 elementer)</Label>
      );
    },
  },
  preview: {
    select: {
      list: "list",
    },
    prepare({ ...props }) {
      return { title: "Accordion", media: StackCompactIcon, list: props?.list };
    },
  },
});
