import JSON5 from "json5";

export function extractArgs(code: string, fileName: string) {
  const args = code.match(/export const args = {([^}]+)}/)?.[1];

  if (!args) {
    console.warn(
      `Missing args when parsing code for examples/template: ${fileName}`
    );
    return null;
  }

  return JSON5.parse(`{${args}}`) ?? null;
}
