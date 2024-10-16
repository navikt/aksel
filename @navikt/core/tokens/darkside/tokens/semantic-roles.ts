import _ from "lodash";
import {
  type ColorTheme,
  type GlobalColorRoles,
  type StyleDictionaryTokenConfig,
  globalColorRoles,
} from "../util";

const configForRole = (
  role: GlobalColorRoles,
  theme: ColorTheme,
): StyleDictionaryTokenConfig<"color"> => ({
  bg: {
    [role]: {
      value: `{a.${role}.100.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-hover`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-hoverA`]: {
      value: `{a.${role}.200A.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderateA`]: {
      value: `{a.${role}.200A.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-hover`]: {
      value: `{a.${role}.300.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-hoverA`]: {
      value: `{a.${role}.300A.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-pressed`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-pressedA`]: {
      value: `{a.${role}.400A.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong-hover`]: {
      value: `{a.${role}.700.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong-pressed`]: {
      value: `{a.${role}.800.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-raised`]: {
      /* We bump raised for darkmode */
      value: `{a.${role}.${theme === "light" ? "100" : "200"}.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-raised-hover`]: {
      value: `{a.${role}.${theme === "light" ? "200" : "300"}.value}`,
      type: "color",
      group: `background.${role}`,
    },
  },
  text: {
    [role]: {
      value: `{a.${role}.700.value}`,
      type: "color",
      group: `text.${role}`,
    },
    [`${role}-strong`]: {
      value: `{a.${role}.900.value}`,
      type: "color",
      group: `text.${role}`,
    },
    [`${role}-icon`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: `text.${role}`,
    },
  },
  border: {
    [role]: {
      value: `{a.${role}.500.value}`,
      type: "color",
      group: `border.${role}`,
    },
    [`${role}-subtle`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: `border.${role}`,
    },
    [`${role}-subtleA`]: {
      value: `{a.${role}.400A.value}`,
      type: "color",
      group: `border.${role}`,
    },
    [`${role}-strong`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: `border.${role}`,
    },
  },
});

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRolesConfig = (theme: ColorTheme) =>
  globalColorRoles.reduce(
    (acc, role) => _.merge(acc, configForRole(role, theme)),
    {} as ReturnType<typeof configForRole>,
  );
