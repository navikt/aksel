"use server";

import { zodFormDataSchema } from "./actions.zod";

async function sendFeedbackAction(
  feedback: string,
  docId: string,
): Promise<{ value: "ok"; error: null } | { value: "error"; error: string }> {
  const validatedFormData = zodFormDataSchema.safeParse({
    feedback,
    docId,
  });

  if (!validatedFormData.success) {
    return {
      value: "error",
      error:
        validatedFormData.error.flatten().fieldErrors.feedback?.join(",") ?? "",
    };
  }

  return { value: "ok", error: null };
}

type FormState =
  | { value: "sent"; error: string | null }
  | { value: "writing"; error: string | null }
  | { value: "error"; error: string };

export { sendFeedbackAction };
export type { FormState };
