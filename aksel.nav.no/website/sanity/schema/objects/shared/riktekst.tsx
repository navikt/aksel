import {
  BulletListIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LinkIcon,
  NumberListIcon,
} from "@navikt/aksel-icons";
import InlineCode from "@/web/InlineCode";
import KBD from "@/web/KBD";
import { allArticleDocsRef } from "../../../config";
import {
  ExternalLinkRenderer,
  InternalLinkRenderer,
} from "../../custom-components/LinkRenderer";

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    component: (props) => <p className="text-lg">{props.children}</p>,
  },
];

export const block = {
  title: "Block",
  type: "block" as const,
  styles: [...styles],
  lists: [
    {
      title: "Bullet-liste",
      value: "bullet",
      icon: () => <BulletListIcon aria-label="Ul-liste" />,
    },
    {
      title: "Nummerert-liste",
      value: "number",
      icon: () => <NumberListIcon aria-label="Ol-liste" />,
    },
  ],
  marks: {
    decorators: [
      {
        title: "Strong",
        value: "strong",
        icon: () => (
          <span className="font-semibold" aria-label="bold">
            B
          </span>
        ),
      },
      {
        title: "Italic",
        value: "em",
        icon: () => (
          <span className="italic" aria-label="italic">
            i
          </span>
        ),
      },
      {
        title: "Inline-Kode",
        value: "code",
        icon: () => <CodeIcon aria-label="Kode" />,
        component: ({ children }) => <InlineCode>{children}</InlineCode>,
      },
      {
        title: "Quote",
        value: "quote",
        icon: () => <span className="font-semibold">Q</span>,
        component: ({ children }) => <q>{children}</q>,
      },
      {
        title: "Keyboard",
        value: "kbd",
        icon: () => <kbd>KBD</kbd>,
        component: ({ children }) => <KBD>{children}</KBD>,
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
        components: {
          annotation: InternalLinkRenderer,
        },
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
        components: {
          annotation: ExternalLinkRenderer,
        },
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
    | "templates"
    | "komponent"
    | "prinsipp"
    | "standard"
    | "standalone"
    | "accordion",
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
    "exampletext_block",
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
    "exampletext_block",
  ];

  const komponent = [
    "props_seksjon",
    "tastatur_modul",
    "kode_eksempler",
    "token_ref",
  ];

  const templates = ["kode_eksempler", "exampletext_block"];

  const grunnleggende = ["spesial_seksjon", "attachment"];

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
    case "accordion":
      fields = [...accordion];
      break;
    case "templates":
      fields.push(...templates);
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

export const RiktekstTemplates = {
  title: "Riktekst",
  name: "riktekst_templates",
  type: "array",
  of: Riktekst("templates"),
  icon: FileTextIcon,
};
