import { toPlainText } from "@/lib";
import { Warning } from "@navikt/ds-icons";
import React from "react";

export default {
  name: "alert",
  title: "Alert",
  type: "object",
  icon: Warning,
  fields: [
    {
      title: "Variant",
      name: "variant",
      type: "string",
      validation: (Rule) => Rule.required().error("Alert må ha en variant"),
      options: {
        list: [
          { value: "success", title: "Suksess" },
          { value: "info", title: "Info" },
          { value: "warning", title: "Fare" },
          { value: "error", title: "Error" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    },
    {
      title: "Heading (optional)",
      name: "heading",
      type: "string",
    },
    {
      title: "Heading nivå",
      name: "heading_level",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Alert må ha et heading-nivå"),
      options: {
        list: [
          { value: "h3", title: "H3" },
          { value: "h4", title: "H4" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !parent.heading,
      initialValue: "h3",
    },
    {
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required().error("Alert må ha noe innhold"),
    },
  ],
  preview: {
    select: {
      variant: "variant",
      body: "body",
    },
    prepare(selection) {
      return {
        title: toPlainText(selection?.body),
        subtitle: `Alert - ${selection.variant}`,
        media: () => <Warning />,
      };
    },
  },
};
