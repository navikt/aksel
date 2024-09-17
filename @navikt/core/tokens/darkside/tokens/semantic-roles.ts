import merge from "lodash.merge";
import { GlobalColorRoles, globalColorRoles } from "../util";

const configForRole = (role: GlobalColorRoles) => ({
  bg: {
    [role]: {
      value: `{a.${role}.100.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-hover`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-moderate`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-moderate-hover`]: {
      value: `{a.${role}.300.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-moderate-active`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-moderate-selected`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-strong`]: {
      value: `{a.${role}.700.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-strong-hover`]: {
      value: `{a.${role}.800.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-strong-active`]: {
      value: `{a.${role}.900.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-raised`]: {
      value: `{a.${role}.100.value}`,
      type: "color",
      group: "background",
    },
    [`${role}-raised-hover`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: "background",
    },
  },
  contrast: {
    /* TODO: This might need to be a "custom"-config where each role has its own contrast definition */
    [role]: {
      value: `white`,
      type: "color",
      group: "contrast",
    },
  },
  text: {
    [role]: {
      value: `{a.${role}.1000.value}`,
      type: "color",
      group: "text",
    },
    [`${role}-subtle`]: {
      value: `{a.${role}.900.value}`,
      type: "color",
      group: "text",
    },
    [`${role}-icon`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: "text",
    },
  },
  border: {
    [role]: {
      value: `{a.${role}.500.value}`,
      type: "color",
      group: "border",
    },
    [`${role}-subtle`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: "border",
    },
    [`${role}-strong`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: "border",
    },
  },
});

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRoles = () =>
  globalColorRoles.reduce((acc, role) => merge(acc, configForRole(role)), {});
