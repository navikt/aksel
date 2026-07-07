import { writeComponentNames } from "./metadata/component-names";

const changed = writeComponentNames();

console.info(
  changed ? "Updated ComponentName union" : "ComponentName union up to date",
);
