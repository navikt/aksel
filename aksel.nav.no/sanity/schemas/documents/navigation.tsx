import { Expand, Link } from "@navikt/ds-icons";
import React from "react";
const config = require("../../config");

const maxDepth = 2;

const checkDepth = (list, depth) => {
  if (!list || list.length === 0) {
    throw new Error("Dropdown lister må ha mist et element");
  }

  if (depth > maxDepth) {
    throw new Error(`Sidemeny kan ha maks dybde på ${maxDepth} elementer`);
  }

  for (const el of list) {
    el._type === "dropdown" && checkDepth(el.dropdown, depth + 1);
  }
  return true;
};

function validateNestedDepth(sidemenu) {
  if (!sidemenu) {
    return "Sidemeny må ha minst et element";
  }
  try {
    checkDepth(sidemenu, 0);
  } catch (e) {
    return e.message;
  }
  return true;
}

export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "sidemenu",
      title: "Sidemeny",
      description:
        "Linker eller dropdowns med linker. Maks dybde på 2 dropdowns er støttet. Sider må være publisert før de kan linkes her.",
      type: "array",
      of: [
        { type: "navigation_dropdown", name: "dropdown", title: "Dropdown" },
        { type: "navigation_link", name: "link", title: "Link" },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  validation: (Rule) =>
    Rule.required().custom(({ sidemenu, ...rest }) => {
      return validateNestedDepth(sidemenu);
    }),
};

export const dropdown = {
  name: "navigation_dropdown",
  title: "Dropdown",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Meny",
      name: "dropdown",
      type: "array",
      of: [
        { type: "navigation_link", name: "link", title: "Link" },
        { type: "navigation_dropdown", name: "dropdown", title: "Dropdown" },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        media: <Expand />,
      };
    },
  },
};

export const link = {
  name: "navigation_link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Link",
      name: "link_ref",
      type: "reference",
      weak: true,
      to: [{ type: "komponent_artikkel" }, { type: "ds_artikkel" }],
      validation: (Rule) => Rule.required(),
      /* Matches results based on document prefix */
      options: {
        filter: ({ document }) => {
          const match = config.teams.find((team) =>
            document._id.endsWith(team.name)
          );
          if (!match) {
            return {
              filter: ``,
            };
          }
          return {
            filter: `_type match ["${match.prefix}_*", "*_page"]`,
          };
        },
      },
    },
  ],
  options: {
    modal: {
      type: "dialog",
      width: "medium", // 'small' | 'medium' | 'large' | 'full'
    },
  },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        media: <Link />,
      };
    },
  },
};
