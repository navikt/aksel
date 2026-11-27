import { z } from "zod";

/* Shared by PostToSlackButton and the website route (api/newsletter/slack) */
export const newsletterPayloadSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Meldingen er tom.")
    .max(12000, "Meldingen er for lang for Slack (maks 12 000 tegn)."), // Slack's limit for markdown_text
  secret: z.string().min(1),
});
