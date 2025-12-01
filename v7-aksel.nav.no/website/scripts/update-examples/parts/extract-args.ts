import JSON5 from "json5";
import { ArgsT } from "../types";

export function extractArgs(
  code: string,
  fileName: string,
  env?: "test",
): ArgsT {
  const args = code.match(/export const args = {([^}]+)}/)?.[1];

  if (!args) {
    env !== "test" &&
      console.warn(
        `Missing args when parsing code for example/template: ${fileName}`,
      );
    return {};
  }

  try {
    return JSON5.parse(`{${args}}`);
  } catch (e) {
    console.warn(`Unable to parse args for example/template: ${fileName}`);
    throw e;
  }
}
