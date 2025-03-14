import fs from "fs";
import _ from "lodash";
import { type SemanticColorRoles } from "../../../types";
import { ColorRolesList } from "../../../types";
import { type StyleDictionaryTokenConfig } from "../../tokens.util";

/**
 * Maps the semantic colors to the global color layer for a given role.
 * @note Gray is handled a little differently, as it is visually perceived a little lighter than other colors.
 */
export function semanticTokensForRole(role: SemanticColorRoles) {
  return {
    bg: {
      [`${role}-soft`]: {
        value: `{ax.${role}.100.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-softA`]: {
        value: `{ax.${role}.100A.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderate`]: {
        value: `{ax.${role}.200.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderateA`]: {
        value: `{ax.${role}.200A.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderate-hover`]: {
        value: `{ax.${role}.300.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderate-hoverA`]: {
        value: `{ax.${role}.300A.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderate-pressed`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-moderate-pressedA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-strong`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.700.value}`
            : `{ax.${role}.600.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-strong-hover`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.800.value}`
            : `{ax.${role}.700.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-strong-pressed`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.900.value}`
            : `{ax.${role}.800.value}`,
        type: "color",
        group: `background.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
    },
    text: {
      [role]: {
        value: `{ax.${role}.1000.value}`,
        type: "color",
        group: `text.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-subtle`]: {
        value:
          role === "neutral"
            ? `{ax.${role}.900.value}`
            : `{ax.${role}.800.value}`,
        type: "color",
        group: `text.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-icon`]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `text.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-contrast`]: {
        value: "{ax.neutral.000.value}",
        type: "color",
        group: `text.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
    },
    border: {
      [role]: {
        value: `{ax.${role}.600.value}`,
        type: "color",
        group: `border.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-subtle`]: {
        value: `{ax.${role}.400.value}`,
        type: "color",
        group: `border.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-subtleA`]: {
        value: `{ax.${role}.400A.value}`,
        type: "color",
        group: `border.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
      [`${role}-strong`]: {
        value: `{ax.${role}.700.value}`,
        type: "color",
        group: `border.${role}`,
        comment: "TODO: Sjur fyller ut",
      },
    },
  } satisfies StyleDictionaryTokenConfig<"color">;
}

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRoles = () => {
  return ColorRolesList.reduce(
    (acc, role) => _.merge(acc, semanticTokensForRole(role)),
    {} as ReturnType<typeof semanticTokensForRole>,
  );
};

const createFiles = () => {
  for (const color of ColorRolesList) {
    const fileName = `${color}.tokens.ts`;
    const fileContent = JSON.stringify(semanticTokensForRole(color), null, 2);
    const filePath = `./semantic-roles/${fileName}`;

    const formatedContent = `import { type StyleDictionaryTokenConfig } from "../../../tokens.util";
export const warningSemanticTokenConfig = ${fileContent} satisfies StyleDictionaryTokenConfig<"color">;`;

    fs.writeFileSync(filePath, formatedContent);
    console.info(`File ${fileName} created successfully!`);
  }
};

createFiles();
