import _ from "lodash";
import { AkselColorRole } from "../../../types";
import { type StyleDictionaryTokenConfig } from "../../tokens.util";
import { accentSemanticTokenConfig } from "./semantic-roles/accent.tokens";
import { brandBeigeSemanticTokenConfig } from "./semantic-roles/brand-beige.tokens";
import { brandBlueSemanticTokenConfig } from "./semantic-roles/brand-blue.tokens";
import { brandMagentaSemanticTokenConfig } from "./semantic-roles/brand-magenta.tokens";
import { dangerSemanticTokenConfig } from "./semantic-roles/danger.tokens";
import { infoSemanticTokenConfig } from "./semantic-roles/info.tokens";
import { metaLimeSemanticTokenConfig } from "./semantic-roles/meta-lime.tokens";
import { metaPurpleSemanticTokenConfig } from "./semantic-roles/meta-purple.tokens";
import { neutralSemanticTokenConfig } from "./semantic-roles/neutral.tokens";
import { successSemanticTokenConfig } from "./semantic-roles/success.tokens";
import { warningSemanticTokenConfig } from "./semantic-roles/warning.tokens";

const semanticRoleConfig: Record<AkselColorRole, any> = {
  neutral: neutralSemanticTokenConfig,
  accent: accentSemanticTokenConfig,
  success: successSemanticTokenConfig,
  warning: warningSemanticTokenConfig,
  danger: dangerSemanticTokenConfig,
  info: infoSemanticTokenConfig,
  "brand-magenta": brandMagentaSemanticTokenConfig,
  "brand-beige": brandBeigeSemanticTokenConfig,
  "brand-blue": brandBlueSemanticTokenConfig,
  "meta-purple": metaPurpleSemanticTokenConfig,
  "meta-lime": metaLimeSemanticTokenConfig,
};

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
function semanticTokensForAllRoles() {
  return Object.values(semanticRoleConfig).reduce(
    (acc, config) => _.merge(acc, config),
    {} as StyleDictionaryTokenConfig<"color">,
  );
}

export { semanticRoleConfig, semanticTokensForAllRoles };
