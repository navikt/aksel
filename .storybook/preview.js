import "nav-frontend-core";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) => {
      console.log(b);
      if (a[0].indexOf("all") !== -1) return -1;
      if (b[0].indexOf("all") !== -1) return 1;
      return a[0] === b[0]
        ? 0
        : a[0].localeCompare(b[0], undefined, { numeric: true });
    },
  },
};
