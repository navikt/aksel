import { Expand } from "@navikt/ds-icons";
import { innholdFieldNewNested } from "@/lib";
import React from "react";
import { BodyLong, Label } from "@navikt/ds-react";

export default {
  name: "accordion",
  title: "Accordion",
  type: "object",
  fields: [
    { title: "Tittel (optional)", type: "string", name: "title" },
    {
      title: "Liste",
      description: "Legg til en eller flere elementer",
      name: "list",
      type: "array",
      of: [
        {
          title: "Accordion",
          name: "element",
          type: "object",
          fields: [
            {
              title: "Tittel ",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha en tittel"),
            },
            innholdFieldNewNested("content", "riktekst_aksel"),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare(selection) {
              return {
                title: selection.title ?? "",
                media: () => <Expand />,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Accordion modul må ha minst 1 element"),
    },
  ],
  preview: {
    select: {
      title: "title",
      list: "list",
    },
    prepare(s) {
      return {
        title: s?.title ? s.title : "Accordion",
        list: s?.list,
      };
    },
    component: ({ value }) => {
      return value?.list ? (
        <BodyLong as="div">
          <Label as="p">{`Accordion (${value.list.length})`}</Label>
          <ul>
            {value.list.map((x, y) => (
              <li key={x._key}>{x.title}</li>
            ))}
          </ul>
        </BodyLong>
      ) : (
        <Label as="p">Accordion</Label>
      );
    },
  },
};
