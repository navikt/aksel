let packages = {};

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
  const pathComp = path.match(/\/nav-frontend-(.*)\/md/)[1];
  const props = require("../react-docgen.json");

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
    makePage(`/components/${compOverview[2].toLowerCase()}`, compOverview[2]);

    makePage(
      `/components/${compOverview[2].toLowerCase()}/overview`,
      "Oversikt",
      0
    );

    const source = page.path.match(/\/nav-frontend-(.*)\/md/)[1];
    const pkgjson = require(`nav-frontend-${source}/package.json`);

    const dfs = require("depth-first");
    scan(`nav-frontend-${source}`);

    createPage({
      path: `/components/${compOverview[2].toLowerCase()}/technical`,
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
        props: getProps(page.path),
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
    makePage(
      `/components/${compIngress[2].toLowerCase()}/ingress`,
      "Ingress",
      3
    );
  }
};
