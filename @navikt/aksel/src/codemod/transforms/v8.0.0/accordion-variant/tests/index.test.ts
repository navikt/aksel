import { checkMoveVariantToDataColor } from "../../../../utils/check";
import { migrationConfig } from "../accordion-variant";

const migration = "accordion-variant";

checkMoveVariantToDataColor(__dirname, {
  migration,
  config: migrationConfig,
});
