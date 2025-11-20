import { checkMoveVariantToDataColor } from "../../../../utils/check";
import { migrationConfig } from "../tag-variant";

const migration = "tag-variant";

checkMoveVariantToDataColor(__dirname, {
  migration,
  config: migrationConfig,
});
