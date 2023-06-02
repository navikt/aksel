import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Label } from "@navikt/ds-react";
import { StackCompactIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Accordion = defineType({
  name: "accordion",
  title: "Accordion",
  description:
    "Accordion brukes hvis man har flere seksjoner man ønsker å skjule. Bruke ExpansionCard om du bare skal vise en seksjon",
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
        Rule.required()
          .min(2)
          .error(
            "Accordion modul må ha minst 2 elementer. Bruk ExpansionCard om du bare trenger 1"
          ),
    }),
  ],
  components: {
    preview: (val: any) => {
      return val?.list ? (
        <div>
          {val.list.map((x) => (
            <div
              key={x._key}
              className="border-b-border flex w-full justify-between border-b px-4 py-2 "
            >
              <span>{x.title}</span>
              <ChevronDownIcon aria-hidden />
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
