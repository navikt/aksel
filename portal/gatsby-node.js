exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const frontmatterPath =
    page.context.frontmatter && page.context.frontmatter.path;

  // console.log(JSON.stringify(page, null, 4));
  const makePage = (path) => {
    const newPage = { ...page, path };
    createPage(newPage);
    deletePage(page);
  };

  makePage(page.path);
};
