import { Ruler } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Kode-eksempler",
  name: "kode_eksempler",
  type: "object",
  fields: [
    {
      title: "tittel",
      name: "title",
      type: "string",
      initialValue: "Kode-eksempler",
      readOnly: true,
      hidden: true,
    },
    {
      title: "Standalone-eksempel",
      description: "Vis bare et spesfikt eksempel",
      name: "standalone",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Installasjon-snippet",
      name: "dir",
      type: "reference",
      to: [{ type: "kode_eksempler_fil" }],
      options: {
        filter: "dir == true",
      },
      hidden: ({ parent }) => parent.standalone,
    },
    {
      title: "Installasjon-snippet",
      name: "filnavn",
      type: "reference",
      to: [{ type: "kode_eksempler_fil" }],
      options: {
        filter: "dir != true",
      },
      hidden: ({ parent }) => !parent.standalone,
    },
  ],
  icon: () => <Ruler />,
  preview: {
    select: {
      standalone: "standalone",
      filnavn: "filnavn.title",
      dir: "dir.title",
    },
    prepare({ standalone, filnavn, dir }) {
      return {
        title: "Komponent-demo",
        subtitle: standalone ? filnavn?.replace(".tsx", "") ?? "" : dir ?? "",
        media: () => <Ruler />,
      };
    },
  },
};
