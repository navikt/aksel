import React from "react";
import { defineField, defineType } from "sanity";
import { ChevronDownIcon, Density3Icon } from "@navikt/aksel-icons";
import { Box, HStack, Label } from "@navikt/ds-react";

export const Accordion = defineType({
  name: "accordion",
  title: "Accordion",
  description:
    "Accordion brukes hvis man har flere seksjoner man ønsker å skjule. Bruke ExpansionCard om du bare skal vise en seksjon",
  type: "object",
  icon: () => <Density3Icon aria-hidden />,
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
            "Accordion modul må ha minst 2 elementer. Bruk ExpansionCard om du bare trenger 1",
          ),
    }),
  ],
  components: {
    preview: (val: any) => {
      return val?.list ? (
        <Box paddingBlock="space-8" paddingInline="space-16">
          <Label as="p">{`Accordion (${val.list.length} elementer)`}</Label>
          {val.list.map((item, index) => (
            <React.Fragment key={item.title}>
              <Box paddingBlock="space-8">
                <HStack gap="space-8" justify="space-between" align="center">
                  <span>{item.title}</span>
                  <ChevronDownIcon aria-hidden />
                </HStack>
              </Box>
              {index !== val.list.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </Box>
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
      return {
        title: "Accordion",
        media: () => <Density3Icon aria-hidden />,
        list: props?.list,
      };
    },
  },
});
