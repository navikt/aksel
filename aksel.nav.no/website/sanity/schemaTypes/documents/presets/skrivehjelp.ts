import { defineField } from "sanity";
import { WriteHelp } from "../../custom-components/WriteHelp";

export const skrivehjelp = defineField({
  title: " ",
  name: "writeHelp",
  type: "string",
  group: "skrivehjelp",
  components: {
    input: WriteHelp,
  },
});
