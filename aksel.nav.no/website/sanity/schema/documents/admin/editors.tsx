import Avatar from "boring-avatars";
import { defineField, defineType } from "sanity";
import { showForDevsOnly } from "../../../util";

export const Editors = defineType({
  title: "Forfattere",
  name: "editor",
  type: "document",

  fields: [
    defineField({
      title: "Navn",
      name: "title",
      description:
        "Det er frivillig å vise navn på Aksel. Hvis du ikke ønsker at navnet ditt skal være tilgjengelig kan man velge å bare bruke fornavn eller et pseudonym.",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    }),
    defineField({
      title: "Epostaddresse",
      description: "Bruk Nav-epostaddresse.",
      name: "email",
      type: "string",
      initialValue: (_, { currentUser }) => {
        return currentUser?.email ?? "";
      },
      validation: (Rule) =>
        Rule.required()
          .email()
          .custom((email) => {
            if (!email?.includes("@nav.no")) {
              return "Epostaddresse må være en Nav-epostaddresse. Må slutte på '@nav.no'";
            }
            return true;
          }),
    }),
    defineField({
      title: "Alternativ epostaddresse",
      description: "For brukere som er logget inn med annen metode enn SSO",
      name: "alt_email",
      type: "string",
      validation: (Rule) => Rule.email(),
      hidden: showForDevsOnly(),
    }),
    defineField({
      title: "Migrert til redaksjon",
      name: "migratedToEditorialStaff",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "title",
      migratedToEditorialStaff: "migratedToEditorialStaff",
    },
    prepare(selection) {
      const { title, migratedToEditorialStaff } = selection;

      return {
        title,
        subtitle: `${migratedToEditorialStaff ? "Migrert |" : ""} Forfatter`,
        media: () => (
          <Avatar
            size={100}
            name={title ?? ""}
            square
            variant="beam"
            colors={["#D1DAB9", "#92BEA5", "#6F646C", "#671045", "#31233E"]}
          />
        ),
      };
    },
  },
});
