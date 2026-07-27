import { defineField, defineType } from "sanity";

export const ComponentMetadata = defineType({
  title: "Komponent-metadata",
  name: "ds_component_metadata",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      title: "Directory",
      name: "dir",
      type: "string",
      readOnly: true,
    }),
    defineField({
      title: "Keywords",
      name: "keywords",
      type: "array",
      readOnly: true,
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Related",
      name: "related",
      type: "array",
      readOnly: true,
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Components",
      name: "components",
      type: "array",
      readOnly: true,
      of: [documentEntry("component")],
    }),
    defineField({
      title: "Utils",
      name: "utils",
      type: "array",
      readOnly: true,
      of: [documentEntry("util")],
    }),
  ],
  preview: {
    select: {
      title: "name",
      dir: "dir",
    },
    prepare(selection) {
      const { title, dir } = selection;
      return {
        title,
        subtitle: `${dir}`,
      };
    },
  },
  __experimental_omnisearch_visibility: false,
});

function documentEntry(key: "component" | "util") {
  return defineField({
    title: key,
    name: key,
    type: "object",
    readOnly: true,
    fields: [
      defineField({
        title: "Displayname",
        name: "displayname",
        type: "string",
        readOnly: true,
      }),
      defineField({
        title: "Filepath",
        name: "filepath",
        type: "string",
        readOnly: true,
      }),
      defineField({
        title: "Overridable",
        name: "overridable",
        type: "boolean",
        readOnly: true,
      }),
      defineField({
        title: "Props",
        name: "props",
        type: "array",
        readOnly: true,
        of: [
          {
            title: "Prop",
            name: "prop",
            type: "object",
            fields: [
              {
                title: "Name",
                name: "name",
                type: "string",
              },
              {
                title: "DefaultValue",
                name: "defaultValue",
                type: "string",
              },
              {
                title: "Description",
                name: "description",
                type: "text",
              },
              {
                title: "Required",
                name: "required",
                type: "boolean",
              },
              {
                title: "Type",
                name: "type",
                type: "string",
              },
              {
                title: "Unpacked type",
                name: "unpackedType",
                type: "string",
              },
              {
                title: "isRef",
                name: "ref",
                type: "boolean",
              },
              {
                title: "Return",
                name: "return",
                type: "string",
              },
              {
                title: "Example",
                name: "example",
                type: "text",
              },
              {
                title: "Params",
                name: "params",
                type: "array",
                of: [{ type: "string" }],
              },
              {
                title: "Deprecated",
                name: "deprecated",
                type: "string",
              },
            ],
          },
        ],
      }),
    ],
  });
}
