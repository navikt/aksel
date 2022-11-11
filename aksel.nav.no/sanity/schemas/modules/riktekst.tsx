import "@navikt/ds-css?raw";
import "@navikt/ds-css-internal?raw";
import { ExternalLink, FileContent, Link } from "@navikt/ds-icons";
import { BodyLong, Heading } from "@navikt/ds-react/cjs";
import { KBD } from "@sanity/ui";
import React from "react";
import styled from "styled-components";
import { allDocumentTypes } from "../../config";

export const TitleRenderer = (props, size, level) => (
  <Heading size={size} level={level}>
    {props.children}
  </Heading>
);

export const ScCode = styled.code`
  color: var(--a-deepblue-500);
  background-color: var(--a-deepblue-50);
  border-radius: 6px;
  font-size: 1rem;
  padding: 2px 0.5rem;
`;

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    blockEditor: {
      render: (props) => <BodyLong>{props.children}</BodyLong>,
    },
  },
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      {
        title: "Code",
        value: "code",
        blockEditor: {
          render: (props) => <ScCode>{props.children}</ScCode>,
        },
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
    // Annotations can be any object structure – e.g. a link or a footnote.
    annotations: [
      {
        title: "Link til side i sanity",
        name: "internalLink",
        type: "object",
        blockEditor: {
          icon: () => <Link />,
        },
        options: {
          modal: {
            type: "dialog",
            width: "medium", // 'small' | 'medium' | 'large' | 'full'
          },
        },
        fields: [
          {
            title: "Reference",
            name: "reference",
            type: "reference",
            to: [
              ...allDocumentTypes.map((doc) => ({
                type: doc,
              })),
            ],
          },
        ],
      },
      {
        title: "Lenke",
        name: "link",
        type: "object",
        blockEditor: {
          icon: () => <ExternalLink />,
        },
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
            validation: (Rule) =>
              Rule.uri({
                scheme: ["https", "mailto", "tel"],
              }),
          },
          {
            title: "Åpne siden i ny tab",
            description:
              "Vi anbefaler å ikke åpne lenker i ny fane slik at brukeren selv kan styre det om ønsket.",
            name: "blank",
            type: "boolean",
            initialValue: false,
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
    blockEditor: {
      render: (props) => (
        <Heading as="span" size="medium">
          {props.children}
        </Heading>
      ),
    },
  },
  {
    title: "H3",
    value: "h3",
    blockEditor: {
      render: (props) => (
        <Heading as="span" size="small">
          {props.children}
        </Heading>
      ),
    },
  },
  {
    title: "H4",
    value: "h4",
    blockEditor: {
      render: (props) => (
        <Heading as="span" size="xsmall">
          {props.children}
        </Heading>
      ),
    },
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
    "accordion",
    "alert",
    "tabell",
    "video",
  ];

  const comp = [
    "props_seksjon",
    "tastatur_modul",
    "tokens",
    "kode_eksempler",
    "token_ref",
  ];

  const ds_artikkel = ["tokens", "spesial_seksjon"];

  fields.push(...standard);

  switch (type) {
    case "komponent":
      fields.push(...comp);
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
  icon: () => <FileContent />,
};

export const RiktekstPrinsipp = {
  title: "Riktekst Aksel",
  name: "riktekst_prinsipp",
  type: "array",
  of: Riktekst("prinsipp"),
  icon: () => <FileContent />,
};

export const RiktekstDsArtikkel = {
  title: "Riktekst Aksel",
  name: "riktekst_ds_artikkel",
  type: "array",
  of: Riktekst("ds"),
  icon: () => <FileContent />,
};

export const RiktekstKomponent = {
  title: "Riktekst Aksel",
  name: "riktekst_komponent",
  type: "array",
  of: Riktekst("komponent"),
  icon: () => <FileContent />,
};

export const RiktekstTabell = {
  title: "Riktekst",
  name: "riktekst_tabell",
  type: "array",
  of: [
    {
      ...block,
      marks: {
        ...block.marks,
        annotations: block.marks.annotations.filter(
          (x) => x.name !== "internalLink"
        ),
      },
    },
  ],
};

export const RiktekstEnkel = {
  title: "Riktekst",
  name: "riktekst_enkel",
  type: "array",
  of: [block],
};
