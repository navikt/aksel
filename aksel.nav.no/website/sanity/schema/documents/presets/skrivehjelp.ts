import { defineField } from "sanity";
import { WriteHelp } from "../../custom-components/WriteHelp";

type DocumentType =
  | "aksel_blogg"
  | "aksel_artikkel"
  | "aksel_prinsipp"
  | "komponent_artikkel"
  | "ds_artikkel"
  | "testDoc";

export const skrivehjelp = (documentType: DocumentType) => {
  return defineField({
    title: " ",
    name: "writeHelp",
    type: "string",
    group: "skrivehjelp",
    components: {
      input: WriteHelp,
    },
    options: {
      //@ts-ignore
      docType: documentType,
    },
  });
};
