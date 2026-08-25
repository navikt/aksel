import { z } from "zod";

const zodFormDataSchema = z.object({
  feedback: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Tilbakemelding er påkrevd"
          : "Tilbakemelding må være en tekststreng",
    })
    .min(1, "Du kan ikke sende en tom tilbakemelding")
    .max(500, "Tilbakemeldingen må være under 500 tegn"),
  docId: z.string("Dokument-ID mangler"),
});

export { zodFormDataSchema };
