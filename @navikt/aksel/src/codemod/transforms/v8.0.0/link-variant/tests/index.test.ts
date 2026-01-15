import { checkMoveVariantToDataColor } from "../../../../utils/check";
import { migrationConfig } from "../link-variant";

const migration = "link-variant";

checkMoveVariantToDataColor(__dirname, {
  migration,
  config: migrationConfig,
});
