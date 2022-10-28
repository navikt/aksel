import React from "react";
import { People } from "@navikt/ds-icons";
import T from "@sanity/base/initial-value-template-builder";
import userStore from "part:@sanity/base/user";

const sanityClient = require("@sanity/client");
const sanityToken = process.env.SANITY_TOKEN;
const SanityConfig = require("../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  /* Token er safe og har bare tillatelse til å lese template doc */
  token:
    "skt6kqEcXmRxUTGDzdEcw11g7HJi9DaHX2fyn8Z0Dearr1k67ykW2N64KTP9GxAPNN6P8TlzPjUdkfGsvbJkfmwfq0UNudKfMYOfyz9OeA666y15pPLRr6D7xnrJGEEBYwSvG6baLLiJI478YowWpjqp1Mz2U1PbAPnIMW4W5btTpdQbwPSD",
  useCdn: false,
});

export default [
  ...T.defaults().filter((x) => !["komponent_artikkel"].includes(x.spec.id)),

  T.template({
    id: "komponent_artikkel_template",
    title: "Mal for Komponentsider",
    schemaType: "komponent_artikkel",
    value: async () => {
      const doc = await client.fetch(`*[_type == "ds_component_template"][0]`);
      return doc
        ? Object.entries(doc).reduce((old, [key, val]) => {
            return key.startsWith("_") ? { ...old } : { ...old, [key]: val };
          }, {})
        : {};
    },
  }),
  T.template({
    id: "newEditor",
    title: "Editor",
    schemaType: "editor",
    icon: () => <People />,
    value: async () => {
      const { id, displayName } = await userStore.getUser("me");

      return {
        title: displayName,
        user_id: {
          current: id,
        },
        _type: "editor",
      };
    },
  }),
];
