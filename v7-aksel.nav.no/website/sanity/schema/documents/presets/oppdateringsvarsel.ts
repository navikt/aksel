import { defineField } from "sanity";
import { UpdateInfo } from "../../custom-components";

export type Oppdateringsvarsel = {
  updateInfo: {
    lastVerified: string;
  };
};

export const oppdateringsvarsel = defineField({
  title: "Sist godkjent",
  name: "updateInfo",
  type: "object",
  group: "innhold",
  components: {
    field: UpdateInfo,
  },
  fields: [
    defineField({
      type: "date",
      name: "lastVerified",
      title: "Sist oppdatert",
      description: "Kun synlig for utviklere",
      hidden: ({ currentUser }) => {
        return !currentUser?.roles.some((r) => r.name === "developer");
      },
      readOnly: true,
    }),
  ],
});
