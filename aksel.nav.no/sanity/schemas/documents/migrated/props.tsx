/* import { ExampleKeys } from "website/component-examples"; */

export default {
  title: "Autogenerert Propdata",
  name: "ds_props",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      readOnly: true,
    },
    {
      title: "Displayname",
      name: "displayname",
      type: "string",
      readOnly: true,
    },
    {
      title: "Filepath",
      name: "filepath",
      type: "string",
      readOnly: true,
    },
    {
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
              type: "string",
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
              title: "isRef",
              name: "ref",
              type: "boolean",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      filepath: "filepath",
      id: "_id",
    },
    prepare(selection) {
      const { title, filepath, id } = selection;
      const str = id.includes("core") ? "ds-react" : "ds-internal";
      return {
        title,
        subtitle: `${str}: ${filepath}`,
      };
    },
  },
  __experimental_omnisearch_visibility: false,
};
