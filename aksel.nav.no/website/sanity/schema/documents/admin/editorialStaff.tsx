import { parseInt } from "lodash";
import Image from "next/image";
import { SlugValue, defineField, defineType } from "sanity";
import { SANITY_API_VERSION } from "@/sanity/config";
import { showForDevsOnly } from "../../../util";

export const EditorialStaff = defineType({
  title: "Redaksjon",
  name: "editorial_staff",
  type: "document",

  fields: [
    defineField({
      title: "Navn",
      name: "title",
      description:
        "Navnet til Redaksjonen, ofte et team feks (Nav.no, Aksel... o.l.), men kan også være en gruppering på interesseområder feks (Security champions, Fagtorsdagkomitéen... o.l.)",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    }),
    defineField({
      title: "Beskrivelse",
      description: "En kort beskrivelse av redaksjonen. Maks 140 tegn",
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required().max(140).error("Maks 140 tegn"),
    }),
    defineField({
      title: "avatar_id",
      name: "avatar_id",
      type: "slug",
      hidden: showForDevsOnly(),
      initialValue: async (params, context) => {
        const client = context.getClient({ apiVersion: SANITY_API_VERSION });

        let slugs: SlugValue[] = await client.fetch(
          `*[_type == "editorial_staff"].avatar_id`,
        );

        slugs = slugs.filter((slug) => slug?.current);

        let max = 0;
        for (const slug of slugs) {
          const curr = parseInt(slug.current ?? "0");

          if (curr > max) {
            max = curr;
          }
        }

        return { current: `${max + 1}` };
      },
    }),

    defineField({
      title: "Bidragsytere",
      name: "legacy_contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editor" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      avatar_id: "avatar_id",
    },
    prepare(selection) {
      const { title, avatar_id } = selection;

      return {
        title,
        subtitle: "Redaksjon",
        media: () => (
          <Image
            src={`/avatars/${
              avatar_id?.current.padStart(3, "0") ?? "broken"
            }.svg`}
            width="100"
            height="100"
            alt="avatar graphic"
          />
        ),
      };
    },
  },
});
