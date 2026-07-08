import { writeComponentNames } from "./metadata/component-names";

writeComponentNames()
  .then((changed) => {
    console.info(
      changed
        ? "Updated ComponentName union"
        : "ComponentName union up to date",
    );
  })
  .catch((err) => {
    console.error("Error writing ComponentName union:", err);
    process.exit(1);
  });
