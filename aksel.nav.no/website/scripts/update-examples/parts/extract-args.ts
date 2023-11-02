import JSON5 from "json5";
import { ArgsT } from "../types";

export function extractArgs(
  code: string,
  fileName: string,
  env?: "test"
): ArgsT | null {
  const args = code.match(/export const args = {([^}]+)}/)?.[1];

  if (!args) {
    env !== "test" &&
      console.warn(
        `Missing args when parsing code for examples/template: ${fileName}`
      );
    return null;
  }

  return JSON5.parse(`{${args}}`) ?? null;
}
