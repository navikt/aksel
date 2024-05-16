import { defineField } from "sanity";
import { WriteHelp } from "./WriteHelpInput";

const writeHelpField = defineField({
  title: " ",
  name: "writeHelp",
  type: "string",
  group: "skrivehjelp",
  components: {
    input: WriteHelp,
  },
});

export { writeHelpField };
