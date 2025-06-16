import { parseInt } from "lodash";
import { SlugValue, defineField, defineType } from "sanity";
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
        const client = context.getClient({ apiVersion: "2025-06-16" });

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
  ],
  preview: {
    select: {
      title: "title",
      avatar_url: "avatar_url",
    },
    prepare(selection) {
      const { title, avatar_url } = selection;

      return {
        title,
        subtitle: "Redaksjon",
        media: () => <svg href={avatar_url} />,
      };
    },
  },
});
