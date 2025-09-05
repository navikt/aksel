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
      /* Make sure to only create profile for SSO-logins */
      if (
        !currentUser?.email.endsWith("@nav.no") ||
        !currentUser.provider?.includes("saml")
      ) {
        return [];
      }
      try {
        profile = await client.createIfNotExists({
          _type: "editor",
          _id: `auto-editor.${currentUser.id}`,
          email: currentUser.email,
          title: currentUser.name,
        });
      } catch {
        const { logger } = await import("@navikt/next-logger");
        logger.error({
          message: "Failed to create sanity profile for user.",
          roles: JSON.stringify(currentUser.roles),
        });
        return [];
      }
    }

    return [{ _ref: profile._id, _type: "reference" }];
  },
});

export const writersField = defineField({
  title: "Redaksjoner",
  description: "Legg til redaksjoner som har bidratt til artikkelen.",
  name: "writers",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editorial_staff" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
});
