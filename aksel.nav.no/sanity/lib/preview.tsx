import { Edit, Task } from "@navikt/ds-icons";
import React from "react";

export const defaultDocPreview = {
  preview: {
    select: {
      heading: "heading",
      status: "status",
      metadata: "metadata",
      id: "_id",
      type: "_type",
      tema: "tema.0.title",
      prinsipp: "prinsipp",
    },
    prepare(selection) {
      const { id, heading, type, tema, prinsipp } = selection;
      return {
        title: heading,
        subtitle: !!prinsipp
          ? !!prinsipp?.hovedside
            ? "Hovedside"
            : "Artikkel"
          : !!tema
          ? `${tema}`
          : type.includes("_component_")
          ? "Komponentside"
          : type.includes("_tabbed_")
          ? "Artikkel m/tabs"
          : "Artikkel",
        media: id.includes("drafts.") ? (
          <Edit aria-hidden />
        ) : (
          <Task aria-hidden />
        ),
      };
    },
  },
};
