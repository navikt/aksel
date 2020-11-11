import "nav-frontend-core";
import "@nav-frontend/ds-tokens";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    // Makes sure `all` story is first
    storySort: (a, b) => {
      if (a[0].indexOf("all") !== -1) return -1;
      if (b[0].indexOf("all") !== -1) return 1;
      return 0;
    },
  },
};
