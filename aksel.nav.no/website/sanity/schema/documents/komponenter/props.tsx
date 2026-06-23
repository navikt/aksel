import { defineField, defineType } from "sanity";

export const Props = defineType({
  title: "Props designsystemet",
  name: "ds_props",
  type: "document",
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      readOnly: true,
    }),
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
      title: "props",
      name: "proplist",
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
  preview: {
    select: {
      title: "title",
      filepath: "filepath",
      id: "_id",
    },
    prepare(selection) {
      const { title, filepath } = selection;
      return {
        title,
        subtitle: `${filepath}`,
      };
    },
  },
  __experimental_omnisearch_visibility: false,
});
