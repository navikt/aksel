import {
  defaultDocPreview,
  editorField,
  groups,
  ingressField,
  innholdFieldPrinsipp,
  isSlugUnique,
  migratedField,
  prinsipper,
  publishedAtField,
  SEOFields,
  titleField,
} from "@/lib";
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2020-06-19" });

const prefix = "prinsipper/";

export default {
  title: "Aksel Prinsipp",
  name: "aksel_prinsipp",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    {
      title: "url",
      name: "slug",
      type: "slug",
      validation: (Rule) =>
        Rule.required().custom((slug, { document }) => {
          if (!slug || !slug.current)
            return `Må ha noe innhold. Har du husket å velget et prinsipp først?`;
          const maxLength = document?.prinsipp?.hovedside ? 2 : 3;
          const newPrefix = `${prefix}${document?.prinsipp?.prinsippvalg}`;

          if (!document?.prinsipp?.prinsippvalg)
            return `Siden må ha valgt prinsipp for å sette opp url`;
          if (document?.prinsipp?.hovedside && slug.current !== newPrefix) {
            return `Siden er en hovedside for prinsippet og må derfor være på url ${newPrefix}`;
          }
          if (
            !document?.prinsipp?.hovedside &&
            !slug.current.startsWith(newPrefix)
          ) {
            return `Slug må starte med: ${newPrefix}`;
          }

          if (
            (slug.current.split("/") || []).filter((x) => !!x).length !==
            maxLength
          ) {
            return `Siden må være på ${maxLength} nivå`;
          }
          return true;
        }),
      group: "settings",
      options: {
        isUnique: isSlugUnique,
        source: ({ prinsipp = null, heading = null }) => ({
          prinsipp,
          heading,
        }),
        slugify: ({ prinsipp, heading }) => {
          if (!prinsipp || !heading) return "";
          const rest = prinsipp.hovedside ? "" : `/${heading}`;
          return `${prefix}${prinsipp.prinsippvalg}${rest}`
            .toLowerCase()
            .trim()
            .slice(0, 80)
            .trim()
            .replace(/\s+/g, "-")
            .replace("æ", "a")
            .replace("ø", "o")
            .replace("å", "a");
        },
      },
    },
    {
      title: "Prinsipp",
      description: "Velg prinsippet siden omhandler",
      name: "prinsipp",
      group: "innhold",
      type: "object",
      fields: [
        {
          title: "Velg prinsipp",
          name: "prinsippvalg",
          type: "string",
          options: {
            list: prinsipper,
            layout: "radio",
          },
          validation: (Rule) =>
            Rule.required().error("Prinsippsider må ha valgt et prinsipp"),
        },
        {
          title: "Er denne siden hovedsiden til Prinsippet?",
          name: "hovedside",
          type: "boolean",
          initialValue: false,
          validation: (Rule) =>
            Rule.required().custom(async (_, { document, parent }) => {
              const id = document._id.replace(/^drafts\./, "");
              const params = {
                draft: `drafts.${id}`,
                published: id,
                hoved: parent?.hovedside,
                prinsipp: parent?.prinsippvalg,
              };

              const query = `*[!(_id in [$draft, $published]) && _type == "aksel_prinsipp" && prinsipp.prinsippvalg == $prinsipp && prinsipp.hovedside == true][0]{heading,_id}`;
              const res = await client.fetch(query, params);

              if (parent?.hovedside && !!res?._id) {
                return `Kan bare ha en hovedside for hvert prinsipp. Hovedsiden er nå: ${
                  res?.heading ?? "Siden har ikke en heading"
                }`;
              } else if (!parent?.hovedside && !res?._id) {
                return `Hvert prinsipp må ha minst en hovedside. Velg en hovedside før du fortsetter`;
              }
              return true;
            }),
        },
      ],
    },
    {
      title: "Hero bilde",
      name: "hero_bilde",
      type: "herobilde",
      group: "innhold",
      hidden: ({ parent }) => !parent.prinsipp.hovedside,
    },
    ingressField,
    innholdFieldPrinsipp,
    SEOFields,
    migratedField,
  ],
};
