import _ from "lodash";
import {
  type ColorTheme,
  type GlobalColorRoles,
  StyleDictionaryToken,
  type StyleDictionaryTokenConfig,
  TokenTypes,
  globalColorRoles,
} from "../util";

type BgKeys =
  | GlobalColorRoles
  | `${GlobalColorRoles}-hover`
  | `${GlobalColorRoles}-hoverA`
  | `${GlobalColorRoles}-moderate`
  | `${GlobalColorRoles}-moderateA`
  | `${GlobalColorRoles}-moderate-hover`
  | `${GlobalColorRoles}-moderate-hoverA`
  | `${GlobalColorRoles}-moderate-pressed`
  | `${GlobalColorRoles}-moderate-pressedA`
  | `${GlobalColorRoles}-strong`
  | `${GlobalColorRoles}-strong-hover`
  | `${GlobalColorRoles}-strong-pressed`
  | `${GlobalColorRoles}-raised`
  | `${GlobalColorRoles}-raised-hover`;

type TextKeys =
  | GlobalColorRoles
  | `${GlobalColorRoles}-strong`
  | `${GlobalColorRoles}-icon`;

type BorderKeys =
  | GlobalColorRoles
  | `${GlobalColorRoles}-subtle`
  | `${GlobalColorRoles}-subtleA`
  | `${GlobalColorRoles}-strong`;

export type SemanticTokensForAllRolesConfigT<T extends TokenTypes> = {
  bg: {
    [k in BgKeys]: Record<string, StyleDictionaryToken<T>>;
  };
  text: {
    [k in TextKeys]: Record<string, StyleDictionaryToken<T>>;
  };
  border: {
    [k in BorderKeys]: Record<string, StyleDictionaryToken<T>>;
  };
};

const configForRole = (role: GlobalColorRoles, theme: ColorTheme) => {
  return {
    bg: {
      [role]: {
        value: `{ax.${role}.100.value}`,
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
      [`${role}-raised`]: {
        /* We bump raised for darkmode */
        value: `{ax.${role}.${theme === "light" ? "100" : "200"}.value}`,
        type: "color",
        group: `background.${role}`,
      },
      [`${role}-raised-hover`]: {
        value: `{ax.${role}.${theme === "light" ? "200" : "300"}.value}`,
        type: "color",
        group: `background.${role}`,
      },
    },
    text: {
      [role]: {
        value: `{ax.${role}.700.value}`,
        type: "color",
        group: `text.${role}`,
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.900.value}`,
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
        value: `{ax.${role}.500.value}`,
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
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `border.${role}`,
      },
    },
  } satisfies StyleDictionaryTokenConfig<"color">;
};

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRolesConfig = (theme: ColorTheme) =>
  globalColorRoles.reduce(
    (acc, role) => _.merge(acc, configForRole(role, theme)),
    {} as ReturnType<typeof configForRole>,
  );
