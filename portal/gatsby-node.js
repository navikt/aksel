let i = 0;
let components = [];

exports.onCreatePage = ({ page, actions }) => {
  //console.log(page.path);
  const { createPage, deletePage } = actions;
  const TechnicalTemp = require.resolve(
    `./src/components/layout/templates/technical.jsx`
  );

  const compOverview = page.path.match(
    /^\/nav-frontend-.*\/md\/(.*\/)?(.*).overview\/$/
  );
  const compAcce = page.path.match(
    /^\/nav-frontend-.*\/md\/(.*\/)?(.*).accessibility\/$/
  );

  const makePage = (path, compName) => {
    const newPage = {
      ...page,
      path,
      context: { frontmatter: { title: compName, rank: i } },
    };
    i++;
    createPage(newPage);
    deletePage(page);
  };

  // console.log(page);
  if (compOverview !== null) {
    makePage(`/components/${compOverview[2].toLowerCase()}`, compOverview[2]);
    makePage(
      `/components/${compOverview[2].toLowerCase()}/overview`,
      compOverview[2]
    );
    if (!components.includes(compOverview[2])) {
      components.push(compOverview[2]);
      createPage({
        path: `/components/${compOverview[2].toLowerCase()}/technical`,
        component: TechnicalTemp,
      });
    }
  }
  if (compAcce !== null) {
    makePage(
      `/components/${compAcce[2].toLowerCase()}/accessibility`,
      compAcce[2]
    );
  }
};
