import { checkMoveVariantToDataColor } from "../../../../utils/check";
import { migrationConfig } from "../toggle-group-variant";

const migration = "toggle-group-variant";

checkMoveVariantToDataColor(__dirname, {
  migration,
  config: migrationConfig,
});
