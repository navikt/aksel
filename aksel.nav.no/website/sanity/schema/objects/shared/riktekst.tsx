import { createClient, groq } from "next-sanity";
import { useEffect, useState } from "react";
import {
  StringInputProps,
  TitledListValue,
  defineField,
  useFormValue,
} from "sanity";
import {
  BulletListIcon,
  ExternalLinkIcon,
  FileTextIcon,
  LinkIcon,
  NumberListIcon,
} from "@navikt/aksel-icons";
import { Kbd } from "@/app/_ui/kbd/Kbd";
import { Code } from "@/app/_ui/typography/Code";
import { clientConfig } from "@/sanity/config";
import { allArticleDocsRef } from "../../../config";
import { ExternalLinkRenderer } from "../../custom-components/LinkRenderer";
import { validateHeadingLevels } from "../../documents/presets/validate-heading-levels";

const sanityClient = createClient({
  ...clientConfig,
  withCredentials: true,
});
const headingsQuery = groq`*[_id == $id][0].content[style match 'h*']{_key, style, "text": pt::text(@)}`;

function HeadingInput(props: StringInputProps) {
  const path = props.path.slice(0, -1).concat("reference");
  const reference = useFormValue(path) as { _ref: string };
  const [headings, setHeadings] = useState<TitledListValue<string>[]>([]);

  useEffect(() => {
    getHeadingsFromDocument(reference._ref).then(setHeadings);
  }, [reference._ref]);

  if (!props.schemaType.options) {
    props.schemaType.options = {};
  }
  props.schemaType.options.list =
    props.value && !headings.find((h) => h.value === props.value)
      ? [{ title: props.value, value: props.value }, ...headings]
      : headings;

  return props.renderDefault(props);
}

async function getHeadingsFromDocument(ref: string) {
  const headings = await sanityClient.fetch(headingsQuery, { id: ref });
  if (!headings) return [];
  return headings
    .filter((heading) => heading.text && heading._key)
    .map((heading) => ({
      title: `${"- ".repeat(parseInt(heading.style[1], 10) - 2)}${heading.text}`,
      value: heading._key,
    }));
}

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    component: (props) => <p>{props.children}</p>,
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
        component: ({ children }) => (
          <strong style={{ fontWeight: 600 }}>{children}</strong>
        ),
      },
      {
        title: "Italic",
        value: "em",
      },
      {
        title: "Inline-Kode",
        value: "code",
        component: ({ children }) => <Code>{children}</Code>,
      },
      {
        title: "Quote",
        value: "quote",
        icon: () => <span>Q</span>,
        component: ({ children }) => <q>{children}</q>,
      },
      {
        title: "Keyboard",
        value: "kbd",
        icon: () => <kbd>KBD</kbd>,
        component: ({ children }) => <Kbd>{children}</Kbd>,
      },
    ],
    annotations: [
      {
        title: "Lenke til Sanity-side",
        name: "internalLink",
        type: "object",
        icon: () => <LinkIcon title="Lenke til internt Sanity-dokument" />,
        options: {
          modal: {
            type: "dialog",
            width: "medium",
          },
        },
        fields: [
          defineField({
            title: "Artikkel",
            name: "reference",
            type: "reference",
            to: allArticleDocsRef,
          }),
          defineField({
            title: "Anker til overskrift (valgfritt)",
            name: "anchor",
            type: "string",
            hidden: ({ parent }) => !parent?.reference,
            components: { input: HeadingInput },
            options: { layout: "dropdown" },
            validation: (Rule) =>
              Rule.custom(async (value, context) => {
                if (!value) return true;
                const parent = context.parent as {
                  reference?: { _ref: string };
                };
                if (!parent.reference) return true;
                const ref = parent.reference._ref;
                const headings = await getHeadingsFromDocument(ref);
                if (!headings.find((h) => h.value === value)) {
                  return "Dette ankeret finnes ikke i artikkelen";
                }
                return true;
              }),
          }),
        ],
      },
      {
        title: "Lenke",
        name: "link",
        type: "object",
        icon: () => <ExternalLinkIcon title="Lenke til ekstern side" />,
        fields: [
          {
            title: "URL",
            description:
              "Hvis du skal lenke til et internt Sanity-dokument, bruk 'Lenke til Sanity-side' i stedet.",
            name: "href",
            type: "string",
            validation: (Rule) =>
              Rule.custom((url) => {
                if (!url) {
                  return "URL må fylles ut";
                }
                if (
                  url.startsWith("#") ||
                  url.startsWith("https://") ||
                  url.startsWith("mailto://") ||
                  url.startsWith("/")
                ) {
                  return true;
                }
                return "Ugyldig URL";
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
    title: "Heading 2",
    value: "h2",
  },
  {
    title: "Heading 3",
    value: "h3",
  },
  {
    title: "Heading 4",
    value: "h4",
  },
];

const Riktekst = (
  type:
    | "blogg"
    | "god-praksis"
    | "grunnleggende"
    | "templates"
    | "komponent"
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
    "language",
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

  const komponent = ["props_seksjon", "kode_eksempler", "token_ref"];

  const templates = ["kode_eksempler", "exampletext_block"];
  const grunnleggende = ["attachment", "props_seksjon"];
  const blogg = ["compare_images"];

  fields.push(...standard);

  switch (type) {
    case "komponent":
      fields.push(...komponent);
      break;
    case "grunnleggende":
      fields.push(...grunnleggende);
      break;
    case "accordion":
      fields = [...accordion];
      break;
    case "templates":
      fields.push(...templates);
      break;
    case "blogg":
      fields.push(...blogg);
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
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstPrinsipp = {
  title: "Riktekst Aksel",
  name: "riktekst_prinsipp",
  type: "array",
  of: Riktekst("standard"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstGrunnleggende = {
  title: "Riktekst Grunnleggende",
  name: "riktekst_grunnleggende",
  type: "array",
  of: Riktekst("grunnleggende"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstKomponent = {
  title: "Riktekst Aksel",
  name: "riktekst_komponent",
  type: "array",
  of: Riktekst("komponent"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstEnkel = {
  title: "Riktekst",
  name: "riktekst_enkel",
  type: "array",
  of: [block],
  icon: () => <FileTextIcon aria-hidden />,
};

export const RiktekstAccordion = {
  title: "Riktekst",
  name: "riktekst_accordion", // NB: Used in expansion-card
  type: "array",
  of: Riktekst("accordion"),
  icon: () => <FileTextIcon aria-hidden />,
};

export const RiktekstStandalone = {
  title: "Riktekst",
  name: "riktekst_standalone",
  type: "array",
  of: Riktekst("standalone"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstTemplates = {
  title: "Riktekst",
  name: "riktekst_templates",
  type: "array",
  of: Riktekst("templates"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};

export const RiktekstBlogg = {
  title: "Riktekst",
  name: "riktekst_blogg",
  type: "array",
  of: Riktekst("blogg"),
  icon: () => <FileTextIcon aria-hidden />,
  validation: (Rule) => {
    return Rule.custom(validateHeadingLevels);
  },
};
