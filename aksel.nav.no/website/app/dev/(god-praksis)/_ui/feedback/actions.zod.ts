import { z } from "zod";

const zodFormDataSchema = z.object({
  feedback: z
    .string({ invalid_type_error: "Ugyldig melding" })
    .min(1, "Kan ikke send en tom tilbakemelding")
    .max(500, "Tilbakemeldingen må være under 500 tegn"),
  docId: z.string({ invalid_type_error: "Ugyldig dokument id" }),
});

export { zodFormDataSchema };
