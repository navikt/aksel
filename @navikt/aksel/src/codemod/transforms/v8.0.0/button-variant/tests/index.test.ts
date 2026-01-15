import { checkMoveVariantToDataColor } from "../../../../utils/check";
import { migrationConfig } from "../button-variant";

const migration = "button-variant";

checkMoveVariantToDataColor(__dirname, {
  migration,
  config: migrationConfig,
});
