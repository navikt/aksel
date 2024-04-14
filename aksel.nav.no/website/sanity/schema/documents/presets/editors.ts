import { defineField } from "sanity";
import { SANITY_API_VERSION } from "@/sanity/config";

export const editorField = defineField({
  title: "Bidragsytere",
  description: "Legg til alle som har bidratt med denne siden!",
  name: "contributors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editor" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
  initialValue: async (_, { currentUser, getClient }) => {
    const client = getClient({ apiVersion: SANITY_API_VERSION });
    let profile = await client.fetch(
      `*[_type == "editor" && (lower($mail) == lower(email) || lower($mail) == lower(alt_email))][0]`,
      { mail: currentUser?.email },
    );

    /**
     * If user forgot to create a profile, we create one for them
     */
    if (!profile) {
      if (!currentUser?.email.endsWith("@nav.no")) {
        return [];
      }
      profile = await client.createIfNotExists({
        _type: "editor",
        _id: `auto-editor-${currentUser?.id}`,
        email: currentUser?.email,
        title: currentUser?.name,
      });
    }

    return [{ _ref: profile._id, _type: "reference" }];
  },
});
