import { defineField } from "sanity";

type DocumentType =
  | "aksel_blogg"
  | "aksel_artikkel"
  | "aksel_prinsipp"
  | "komponent_artikkel"
  | "ds_artikkel"
  | "testDoc";

export const skrivehjelp = (documentType: DocumentType) => {
  return defineField({
    title: "Skrivehjelp",
    name: "writeHelp",
    type: "string",
    group: "skrivehjelp",
    description: "Hjelpen er her!",
    options: {
      //@ts-ignore
      docType: documentType,
    },
  });
};
