import { GlobalColorRoles } from "../util";

export const tokenConfigForRole = (role: GlobalColorRoles) => ({
  bg: {
    [role]: {
      value: `{a.${role}.100.value}`,
      type: "color",
    },
    [`${role}-moderate`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
    },
    [`${role}-moderate-hover`]: {
      value: `{a.${role}.300.value}`,
      type: "color",
    },
  },
});

export const tokenConfigForUniqueTokens = () => ({
  text: {
    default: {
      value: "{a.neutral.900.value}",
      type: "color",
    },
  },
});
