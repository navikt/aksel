import { toPlainText } from "@/lib";
import { LightBulb } from "@navikt/ds-icons";
import React from "react";

export default {
  name: "tips",
  title: "Tips/Feedback",
  type: "object",
  icon: LightBulb,
  fields: [
    {
      title: "Feedback",
      description: "Endrer modul-variant",
      name: "eksperiment",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Tips-modul må ha noe innhold"),
    },
  ],
  preview: {
    select: {
      body: "body",
      eksperiment: "eksperiment",
    },
    prepare(selection) {
      return {
        title: toPlainText(selection?.body ?? []) ?? "",
        subtitle: selection.eksperiment ? "Feedback (tips)" : "Tips",
        media: () => <LightBulb />,
      };
    },
  },
};
