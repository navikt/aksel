import _ from "lodash";
import { ColorRolesList } from "../../../types";
import { semanticRoleTokens } from "./semantic-roles.tokens";

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRolesConfig = () => {
  return ColorRolesList.reduce(
    (acc, role) => _.merge(acc, semanticRoleTokens(role)),
    {} as ReturnType<typeof semanticRoleTokens>,
  );
};
