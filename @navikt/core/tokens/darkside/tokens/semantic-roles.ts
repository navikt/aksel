import _ from "lodash";
import { ColorRolesList, type SemanticColorRoles } from "../../types";
import { type StyleDictionaryTokenConfig } from "../tokens.util";

const configForRole = (role: SemanticColorRoles) => {
  return {
    bg: {
      [`${role}-soft`]: {
        value: `{ax.${role}.100.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-softA`]: {
        value: `{ax.${role}.100A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-hover`]: {
        value: `{ax.${role}.200.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-hoverA`]: {
        value: `{ax.${role}.200A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate`]: {
        value: `{ax.${role}.200.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderateA`]: {
        value: `{ax.${role}.200A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-hover`]: {
        value: `{ax.${role}.300.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-hoverA`]: {
        value: `{ax.${role}.300A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-pressed`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-moderate-pressedA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong-hover`]: {
        value: `{ax.${role}.700.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-strong-pressed`]: {
        value: `{ax.${role}.800.value}`,
        type: "color",
        group: `background.${role}`,
      },
    },
    text: {
      [role]: {
        value: `{ax.${role}.800.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.1000.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-icon`]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `text.${role}`,
      },
    },
    border: {
      [role]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-subtle`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-subtleA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `border.${role}`,
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.700.value}`,
        type: "color",
        group: `border.${role}`,
      },
    },
  } satisfies StyleDictionaryTokenConfig<"color">;
};

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRolesConfig = () => {
  return ColorRolesList.reduce(
    (acc, role) => _.merge(acc, configForRole(role)),
    {} as ReturnType<typeof configForRole>,
  );
};
