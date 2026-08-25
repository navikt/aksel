import { defineField } from "sanity";
import { UpdateInfo, UpdateInfoInput } from "../../custom-components";

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
    input: UpdateInfoInput,
  },
  fields: [
    defineField({
      type: "date",
      name: "lastVerified",
      title: "Sist oppdatert",
      readOnly: true,
    }),
  ],
});
