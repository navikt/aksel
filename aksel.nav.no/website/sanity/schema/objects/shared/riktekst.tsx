import { BoldIcon, CodeIcon, ItalicIcon, OlistIcon } from "@sanity/icons";
import { KBD } from "@sanity/ui";
import React from "react";
import { allArticleDocsRef } from "../../../config";
import { ExternalLinkIcon, FileTextIcon, LinkIcon } from "@navikt/aksel-icons";

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    component: (props) => <p className="text-lg">{props.children}</p>,
  },
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
  lists: [
    {
      title: "Bullet-liste",
      value: "bullet",
      icon: () => <OlistIcon aria-label="Ul-liste" />,
    },
    {
      title: "Nummerert-liste",
      value: "number",
      icon: () => <OlistIcon aria-label="Ol-liste" />,
    },
  ],
  marks: {
    decorators: [
      {
        title: "Strong",
        value: "strong",
        icon: () => <BoldIcon aria-label="Bold" />,
      },
      {
        title: "Italic",
        value: "em",
        icon: () => <ItalicIcon aria-label="Italic" />,
      },
      {
        title: "Inline-Kode",
        value: "code",
        icon: () => <CodeIcon aria-label="Kode" />,
      },
      {
        title: "KBD",
        value: "kbd",
        icon: () => <div>KBD</div>,

        component: (props) => (
          <KBD padding={[1, 1, 2]} style={{ verticalAlign: "super" }}>
            {props.children}
          </KBD>
        ),
      },
    ],
    annotations: [
      {
        title: "Link til sanity-side",
        name: "internalLink",
        type: "object",
        icon: () => <LinkIcon title="Lenke til sanity-side" />,
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
        icon: () => <ExternalLinkIcon title="Lenke til ekstern-side" />,
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

const Riktekst = (
  type:
    | "god-praksis"
    | "grunnleggende"
    | "komponent"
    | "prinsipp"
    | "standard"
    | "standalone"
    | "accordion"
) => {
  let fields: string[] = [];
  const standard = [
    "relatert_innhold",
    "bilde",
    "kode",
    "tips",
    "do_dont",
    "alert",
    "accordion",
    "expansioncard",
    "tabell_v2",
    "video",
  ];

  const accordion = [
    "relatert_innhold",
    "video",
    "bilde",
    "kode",
    "tips",
    "do_dont",
    "alert",
    "tabell_v2",
  ];

  const komponent = [
    "props_seksjon",
    "tastatur_modul",
    "kode_eksempler",
    "token_ref",
  ];

  const grunnleggende = ["spesial_seksjon"];

  fields.push(...standard);

  switch (type) {
    case "komponent":
      fields.push(...komponent);
      break;
    case "grunnleggende":
      fields.push(...grunnleggende);
      break;
    case "prinsipp":
      fields.push("innholdskort");
      break;
    case "standalone":
      fields.push("uufeedback");
      break;
    case "accordion":
      fields = [...accordion];
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

export const RiktekstStandard = {
  title: "Riktekst Standard",
  name: "riktekst_standard",
  type: "array",
  of: Riktekst("standard"),
  icon: FileTextIcon,
};

export const RiktekstPrinsipp = {
  title: "Riktekst Aksel",
  name: "riktekst_prinsipp",
  type: "array",
  of: Riktekst("prinsipp"),
  icon: FileTextIcon,
};

export const RiktekstGrunnleggende = {
  title: "Riktekst Grunnleggende",
  name: "riktekst_grunnleggende",
  type: "array",
  of: Riktekst("grunnleggende"),
  icon: FileTextIcon,
};

export const RiktekstKomponent = {
  title: "Riktekst Aksel",
  name: "riktekst_komponent",
  type: "array",
  of: Riktekst("komponent"),
  icon: FileTextIcon,
};

export const RiktekstEnkel = {
  title: "Riktekst",
  name: "riktekst_enkel",
  type: "array",
  of: [block],
  icon: FileTextIcon,
};

export const RiktekstAccordion = {
  title: "Riktekst",
  name: "riktekst_accordion",
  type: "array",
  of: Riktekst("accordion"),
  icon: FileTextIcon,
};

export const RiktekstStandalone = {
  title: "Riktekst",
  name: "riktekst_standalone",
  type: "array",
  of: Riktekst("standalone"),
  icon: FileTextIcon,
};
