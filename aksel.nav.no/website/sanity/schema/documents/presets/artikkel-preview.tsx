export const artikkelPreview = {
  preview: {
    select: {
      heading: "heading",
    },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: heading,
      };
    },
  },
};
