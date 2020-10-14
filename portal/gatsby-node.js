exports.onCreateNode = ({ node, actions, getNode }) => {
  // console.log(node["component"]);
};

exports.onCreatePage = ({ page, actions }) => {
  //console.log(page.path);
  const { createPage, deletePage, createRedirect, setPageData } = actions;
  const TechnicalTemp = require.resolve(
    `./src/components/layout/templates/technical.jsx`
  );

  const compOverview = page.path.match(
    /^\/nav-frontend-.*\/md\/(.*\/)?(.*).overview\/$/
  );
  const compAcce = page.path.match(
    /^\/nav-frontend-.*\/md\/(.*\/)?(.*).accessibility\/$/
  );
  const compIngress = page.path.match(
    /^\/nav-frontend-.*\/md\/(.*\/)?(.*).ingress\/$/
  );

  const makePage = (path, compName, rank) => {
    const newPage = {
      ...page,
      path,
      context: {
        frontmatter: { ...page.context.frontmatter, title: compName, rank },
      },
    };
    createPage(newPage);
    deletePage(page);
  };

  // console.log(page);
  if (compOverview !== null) {
    makePage(`/components/${compOverview[2].toLowerCase()}`, compOverview[2]);
    // createRedirect({
    //   fromPath: `/components/${compOverview[2].toLowerCase()}`,
    //   toPath: `/components/${compOverview[2].toLowerCase()}/overview`,
    //   isPermanent: true,
    //   redirectInBrowser: true,
    // });
    makePage(
      `/components/${compOverview[2].toLowerCase()}/overview`,
      "Oversikt",
      0
    );
    createPage({
      path: `/components/${compOverview[2].toLowerCase()}/technical`,
      context: {
        frontmatter: { title: "Teknisk", rank: 1 },
        source: page.path,
      },
      component: TechnicalTemp,
    });
  }
  if (compAcce !== null) {
    makePage(
      `/components/${compAcce[2].toLowerCase()}/accessibility`,
      "Tilgjengelighet",
      2
    );
  }

  if (compIngress !== null) {
    // console.log(page);
    makePage(
      `/components/${compIngress[2].toLowerCase()}/ingress`,
      "Ingress",
      3
    );
  }
};
