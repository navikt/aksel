import { ExternalLink, FileContent, Link } from "@navikt/ds-icons";
import { KBD } from "@sanity/ui";
import React from "react";
import { allArticleDocsRef } from "../../../config";

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    blockEditor: {
      render: (props) => <p className="text-lg">{props.children}</p>,
    },
  },
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
  lists: [
    { title: "Bullet-liste", value: "bullet" },
    { title: "Nummerert-liste", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Italic", value: "em" },
      {
        title: "Inline-Kode",
        value: "code",
      },
      {
        title: "KBD",
        value: "kbd",
        blockEditor: {
          icon: () => <div>KBD</div>,
          render: (props) => (
            <KBD padding={[1, 1, 2]} style={{ verticalAlign: "super" }}>
              {props.children}
            </KBD>
          ),
        },
      },
    ],
    annotations: [
      {
        title: "Link til sanity-side",
        name: "internalLink",
        type: "object",
        blockEditor: {
          icon: Link,
        },
        options: {
          modal: {
            type: "dialog",
            width: "medium",
          },
        },
        fields: [
          {
            title: "Reference",
            name: "reference",
            type: "reference",
            to: allArticleDocsRef,
          },
        ],
      },
      {
        title: "Lenke",
        name: "link",
        type: "object",
        blockEditor: {
          icon: ExternalLink,
        },
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
            validation: (Rule) =>
              Rule.uri({
                scheme: ["https", "mailto"],
              }),
          },
        ],
      },
    ],
  },
};

export const headingStyles = [
  ...block.styles,
  {
    title: "H2",
    value: "h2",
  },
  {
    title: "H3",
    value: "h3",
  },
  {
    title: "H4",
    value: "h4",
  },
];

const Riktekst = (type: "aksel" | "ds" | "komponent" | "prinsipp") => {
  const fields: string[] = [];
  const standard = [
    "relatert_innhold",
    "bilde",
    "kode",
    "tips",
    "do_dont",
    "alert",
    "accordion",
    "tabell_v2",
    "video",
  ];

  const komponent = [
    "props_seksjon",
    "tastatur_modul",
    "kode_eksempler",
    "token_ref",
  ];

  const ds_artikkel = ["spesial_seksjon"];

  fields.push(...standard);

  switch (type) {
    case "komponent":
      fields.push(...komponent);
      break;
    case "ds":
      fields.push(...ds_artikkel);
      break;
    case "prinsipp":
      fields.push("innholdskort");
      break;
    default:
      break;
  }

  const uniq = fields.filter((item, pos, self) => self.indexOf(item) === pos);

  return [
    {
      ...block,
      styles: [...headingStyles],
    },
    ...uniq.map((x) => ({ type: x })),
  ];
};

export const RiktekstAksel = {
  title: "Riktekst Aksel",
  name: "riktekst_aksel",
  type: "array",
  of: Riktekst("aksel"),
  icon: FileContent,
};

export const RiktekstPrinsipp = {
  title: "Riktekst Aksel",
  name: "riktekst_prinsipp",
  type: "array",
  of: Riktekst("prinsipp"),
  icon: FileContent,
};

export const RiktekstDsArtikkel = {
  title: "Riktekst Aksel",
  name: "riktekst_ds_artikkel",
  type: "array",
  of: Riktekst("ds"),
  icon: FileContent,
};

export const RiktekstKomponent = {
  title: "Riktekst Aksel",
  name: "riktekst_komponent",
  type: "array",
  of: Riktekst("komponent"),
  icon: FileContent,
};

export const RiktekstEnkel = {
  title: "Riktekst",
  name: "riktekst_enkel",
  type: "array",
  of: [block],
  icon: FileContent,
};
