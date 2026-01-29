import { draftMode } from "next/headers";

export async function GET() {
  const disable = (await draftMode()).disable();
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));
  await Promise.allSettled([disable, delay]);

  return new Response(null, { status: 204 });
}
