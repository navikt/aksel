import { toPlainText } from "@/lib";
import { Data } from "@navikt/ds-icons";
import tableSchema from "part:power-table/schema";
import React from "react";

const Tabell = {
  type: "object",
  name: "tabell",
  title: "Tabell",
  icon: Data,
  fields: [
    {
      title: "Tittel (optional)",
      description: "Gi tabellen et navn for å lettere finne den",
      type: "string",
      name: "title",
    },
    {
      title: "Tabell",
      type: "powerTable",
      name: "powerTable",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(s) {
      return {
        title: s?.title ? s?.title : "Tabell",
        subtitle: s?.title ? "Tabell" : "",
        media: () => <Data />,
      };
    },
  },
};

export const TabellSchema = tableSchema({
  title: "Tabell",
  name: "powerTable",
  cellSchema: {
    type: "object",
    fields: [
      { type: "riktekst_tabell", name: "body" },
      {
        title: "Suksess/feil",
        name: "status",
        type: "string",
        options: {
          list: [
            { value: "ingen", title: "Ingen" },
            { value: "suksess", title: "Suksess" },
            { value: "feil", title: "Feil" },
          ],
          layout: "radio",
        },
        initialValue: "ingen",
      },
      /* { type: "image", name: "ikon", title: "Ikon" }, */
    ],
    preview: {
      select: {
        body: "body",
      },
      prepare(s) {
        return {
          title: toPlainText(s?.body) ?? "-",
        };
      },
    },
  },
});

export default Tabell;
