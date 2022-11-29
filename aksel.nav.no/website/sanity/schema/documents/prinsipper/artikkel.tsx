import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { ingressField } from "../presets/ingress";
import { SEOFields } from "../presets/seo";
import { prinsippKategorier } from "../../../config";

const prefix = "prinsipper/";

export const Prinsipp = defineType({
  title: "Aksel Prinsipp",
  name: "aksel_prinsipp",
  type: "document",
  groups,
  preview: {
    select: {
      heading: "heading",
      prinsipp: "prinsipp",
    },
    prepare(selection) {
      const { heading, prinsipp } = selection;
      return {
        title: heading,
        subtitle: prinsipp?.hovedside ? "Hovedside" : "",
      };
    },
  },
  fields: [
    ...hiddenFields,
    editorField,
    titleField,
    defineField({
      title: "url",
      name: "slug",
      type: "slug",
      validation: (Rule) =>
        Rule.required().custom((slug, { document }: any) => {
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
        source: "heading",
        slugify: (_, __, { parent }: any) => {
          if (!parent.prinsipp || !parent.heading) return "";
          const rest = parent.prinsipp.hovedside ? "" : `/${parent.heading}`;
          return (
            `${prefix}${parent.prinsipp.prinsippvalg}${rest}`
              .toLowerCase()
              .trim()
              .slice(0, 200)
              .trim()
              .replace(/\s+/g, "-")
              .replace(/-+/gm, "-")
              .replace(/æ/g, "a")
              .replace(/å/g, "a")
              .replace(/ø/g, "o")
              // eslint-disable-next-line no-useless-escape
              .replace(/[&\\#,+()$~%.'"¨:*?<>{}]/g, "")
          );
        },
      },
    }),
    defineField({
      title: "Prinsipp",
      description: "Velg prinsippet siden omhandler",
      name: "prinsipp",
      group: "innhold",
      type: "object",
      fields: [
        defineField({
          title: "Velg prinsipp",
          name: "prinsippvalg",
          type: "string",
          options: {
            list: prinsippKategorier,
            layout: "radio",
          },
        }),
        defineField({
          title: "Er denne siden hovedsiden til Prinsippet?",
          name: "hovedside",
          type: "boolean",
          initialValue: false,
          validation: (Rule) =>
            Rule.required().custom(
              async (_, { document, parent, getClient }: any) => {
                const id = document._id.replace(/^drafts\./, "");
                const params = {
                  draft: `drafts.${id}`,
                  published: id,
                  hoved: parent?.hovedside,
                  prinsipp: parent?.prinsippvalg,
                };

                const query = `*[!(_id in [$draft, $published]) && _type == "aksel_prinsipp" && prinsipp.prinsippvalg == $prinsipp && prinsipp.hovedside == true][0]{heading,_id}`;
                const res = await getClient({ apiVersion: "2021-06-07" }).fetch(
                  query,
                  params
                );

                if (parent?.hovedside && !!res?._id) {
                  return `Kan bare ha 1 hovedside for hvert prinsipp. Hovedsiden er nå: ${
                    res?.heading ?? "Siden har ikke en heading"
                  }`;
                } else if (!parent?.hovedside && !res?._id) {
                  return `Hvert prinsipp må ha minst en hovedside. Velg en hovedside før du fortsetter`;
                }
                return true;
              }
            ),
        }),
      ],
    }),
    defineField({
      title: "Hero bilde",
      name: "hero_bilde",
      type: "herobilde",
      group: "innhold",
      hidden: ({ parent }) => !parent?.prinsipp?.hovedside,
    }),
    ingressField,
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_prinsipp",
      group: "innhold",
    }),
    SEOFields,
  ],
});
