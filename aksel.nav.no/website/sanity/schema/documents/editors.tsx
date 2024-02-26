import Avatar from "boring-avatars";
import { defineField, defineType } from "sanity";
import { EditorPage } from "../custom-components/EditorPage";
import { EditorPreview } from "../custom-components/EditorPreview";

export const Editors = defineType({
  title: "Forfattere",
  name: "editor",
  type: "document",
  components: {
    preview: EditorPreview,
  },
  fields: [
    defineField({
      title: "Navn",
      name: "title",
      description:
        "Det er frivillig å vise fult navn på Aksel. Hvis du ikke ønsker at navnet ditt skal være tilgjengelig kan man velge å bare bruke fornavn eller sette seg som 'anonym'",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    }),
    defineField({
      title: "Gjør meg anonym",
      description: "Navnet ditt vil bare bli vist for innloggede brukere. ",
      name: "anonym",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Epostaddresse",
      description: "Bruk NAV-epostaddresse.",
      name: "email",
      type: "string",
      initialValue: (_, { currentUser }) => {
        return currentUser.email;
      },
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("Må legge til epostaddresse for forfatter."),
    }),
    defineField({
      title: "Alternativ epostaddresse",
      description: "For brukere som er logget inn med annen metode enn SSO",
      name: "alt_email",
      type: "string",
      validation: (Rule) => Rule.email(),
      hidden: ({ currentUser }) => {
        const { roles } = currentUser;
        return !roles.find(({ name }) =>
          ["developer", "administrator"].includes(name),
        );
      },
    }),
    defineField({
      name: "profilside",
      type: "string",
      title: "",
      components: {
        field: EditorPage,
      },
      readOnly: true,
      hidden: ({ currentUser, parent }) => {
        const { roles, email } = currentUser;

        if (!parent?.email || !parent?.title) {
          return false;
        }
        if (
          roles.find(({ name }) =>
            ["developer", "administrator"].includes(name),
          )
        ) {
          return false;
        }

        if (parent?.alt_email) {
          return parent?.alt_email !== email;
        }
        return parent?.email !== email;
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      anonym: "anonym",
    },
    prepare(selection) {
      const { title, anonym } = selection;

      return {
        title,
        subtitle: anonym ? "Profilside | Anonym" : "Profilside",
        media: () => (
          <Avatar
            size={100}
            name={title}
            square
            variant="beam"
            colors={["#D1DAB9", "#92BEA5", "#6F646C", "#671045", "#31233E"]}
          />
        ),
      };
    },
  },
});
