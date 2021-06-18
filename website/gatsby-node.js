const path = require(`path`);
const redirects = require("./redirects");
let packages = {};
const dsUrl = "/designsystem";

const getDependencyEdgesFromPackages = () =>
  Object.keys(packages)
    .map((key) => {
      return [key, Object.keys(packages[key] || {})];
    })
    .reduce(
      (arr, [pkgName, pkgDependencies]) => [
        ...arr,
        ...pkgDependencies.map((dependency) => [pkgName, dependency]),
      ],
      []
    );

// Recursive scanning of package.json to find all peerDependencies
const scan = (key) => {
  if (key in packages || key.indexOf("nav-frontend-") === -1) return;
  try {
    const pkgjson = require(`${key}/package.json`);
    if (!("peerDependencies" in pkgjson)) return;
    packages[key] = pkgjson.peerDependencies;
    Object.keys(pkgjson.peerDependencies).forEach((key) => scan(key));
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

const getProps = (path) => {
  let props = [];
  const pathComp = path.match(/\/nav-frontend-(.*)\/md/)[1];
  try {
    props = require("../react-docgen.json");
  } catch {}

  return props
    .filter((prop) => {
      const match = prop.fileName && prop.fileName.match(/nav-frontend-(.*)/);
      const propPath = match && match.length >= 2 ? match[1] : "";
      return propPath === pathComp;
    })
    .map((prop) => prop.docs);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path.indexOf("dev-404-page") !== -1) {
    deletePage(page);
    return;
  }
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
  if (compOverview !== null) {
    makePage(
      `${dsUrl}/components/${compOverview[2].toLowerCase()}`,
      compOverview[2]
    );

    makePage(
      `${dsUrl}/components/${compOverview[2].toLowerCase()}/overview`,
      "Oversikt",
      0
    );

    const source = page.path.match(/\/nav-frontend-(.*)\/md/)[1];
    const pkgjson = require(`nav-frontend-${source}/package.json`);

    const dfs = require("depth-first");
    scan(`nav-frontend-${source}`);

    createPage({
      path: `${dsUrl}/components/${compOverview[2].toLowerCase()}/technical`,
      context: {
        frontmatter: { title: "Teknisk", rank: 1 },
        source: page.path,
        name: pkgjson.name,
        allDep: dfs.default(
          getDependencyEdgesFromPackages(),
          `nav-frontend-${source}`
        ),
        peerDep: pkgjson.peerDependencies,
        main: pkgjson.main,
        version: pkgjson.version,
        defaultExport:
          ("defaultExport" in pkgjson && pkgjson.defaultExport) || "",
        props: [...getProps(page.path)],
      },
      component: TechnicalTemp,
    });
  }
  if (compAcce !== null) {
    makePage(
      `${dsUrl}/components/${compAcce[2].toLowerCase()}/accessibility`,
      "Tilgjengelighet",
      2
    );
  }

  if (compIngress !== null) {
    makePage(
      `${dsUrl}/components/${compIngress[2].toLowerCase()}/ingress`,
      "Ingress",
      3
    );
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  redirects.forEach((path) => {
    createRedirect({
      fromPath: `${path}`,
      toPath: `/designsystem${path}`,
      isPermanent: true,
    });
  });

  const result = await graphql(`
    {
      allGithubFile(filter: { relativeDirectory: { nin: "." } }) {
        edges {
          node {
            base
            path
            relativeDirectory
            childMdx {
              tableOfContents(maxDepth: 3)
              excerpt
            }
            childMarkdownRemark {
              htmlAst
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);
  result.data.allGithubFile.edges
    .filter(({ node }) => node.path.endsWith(".md"))
    .forEach(({ node }) => {
      const parsedPath = `/${node.path.replace(".md", "").replace(" ", "-")}`
        .toLowerCase()
        .replace("readme", "");
      console.log(parsedPath);

      createPage({
        path: parsedPath,
        component: path.resolve(
          `./src/components/layout/templates/verktoykasseArticle.jsx`
        ),
        context: {
          parentDir: node.relativeDirectory,
          htmlAst: node.childMarkdownRemark.htmlAst,
          frontmatter: {
            ...node.childMarkdownRemark.frontmatter,
            ingress: node.childMdx?.excerpt || null,
          },
          toc: node.childMdx?.tableOfContents || null,
        },
      });
    });
};

exports.onPostBuild = ({ store, reporter }) => {
  const { redirects } = store.getState();
  reporter.info("Finished building site, here are all the redirects: ");
  console.log(redirects);
};
